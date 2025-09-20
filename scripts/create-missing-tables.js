#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load environment variables from .local.env
function loadLocalEnv() {
  const envPath = path.resolve(process.cwd(), '.local.env');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .local.env file not found. Please create it with your database credentials.');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, '');
        process.env[key] = value;
      }
    }
  }
}

// Read the migration file
function readMigrationFile() {
  const migrationPath = path.resolve(process.cwd(), 'src/lib/db/migrations/0003_opposite_madame_web.sql');
  
  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath);
    console.log('Please run: npm run db:generate');
    process.exit(1);
  }

  return fs.readFileSync(migrationPath, 'utf-8');
}

// Execute SQL statements using Supabase MCP
async function executeMigration(sql) {
  console.log('🚀 Starting database table creation...');
  
  // Split the SQL into individual statements
  const statements = sql
    .split('--> statement-breakpoint')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);

  console.log(`📋 Found ${statements.length} SQL statements to execute`);

  let successCount = 0;
  let errors = [];

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    if (!statement) continue;

    console.log(`\n⚡ Executing statement ${i + 1}/${statements.length}:`);
    
    // Extract table name for better logging
    let tableName = 'unknown';
    const createTableMatch = statement.match(/CREATE TABLE ["']?(\w+)["']?\s*\(/i);
    const createTypeMatch = statement.match(/CREATE TYPE.*?"(\w+)"/i);
    const alterTableMatch = statement.match(/ALTER TABLE ["']?(\w+)["']?\s/i);
    
    if (createTableMatch) {
      tableName = createTableMatch[1];
    } else if (createTypeMatch) {
      tableName = `TYPE: ${createTypeMatch[1]}`;
    } else if (alterTableMatch) {
      tableName = `FK for ${alterTableMatch[1]}`;
    }

    console.log(`   📊 ${tableName}`);

    try {
      // Here we would use the Supabase MCP tool to execute the SQL
      // Since we can't directly use MCP tools from Node.js, we'll use console output
      // for the user to manually execute via MCP
      
      console.log(`   ✅ Prepared: ${tableName}`);
      successCount++;
    } catch (error) {
      console.error(`   ❌ Failed: ${tableName} - ${error.message}`);
      errors.push({ statement: i + 1, table: tableName, error: error.message });
    }
  }

  return { successCount, errors, statements };
}

// Main execution function
async function main() {
  try {
    console.log('🔧 Loading environment variables from .local.env...');
    loadLocalEnv();

    if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
      console.error('❌ DATABASE_URL or SUPABASE_DB_URL not found in .local.env');
      process.exit(1);
    }

    console.log('✅ Environment variables loaded successfully');

    console.log('📖 Reading migration file...');
    const migrationSQL = readMigrationFile();
    console.log('✅ Migration file loaded successfully');

    const result = await executeMigration(migrationSQL);

    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Prepared statements: ${result.successCount}`);
    console.log(`   ❌ Errors: ${result.errors.length}`);

    if (result.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      result.errors.forEach(error => {
        console.log(`   ${error.statement}. ${error.table}: ${error.error}`);
      });
    }

    // Since we can't directly execute via MCP in Node.js, provide the SQL for manual execution
    console.log('\n🎯 NEXT STEPS:');
    console.log('Since this script cannot directly execute MCP tools, please execute the following SQL statements manually using the Supabase MCP tool or dashboard:');
    console.log('\n' + '='.repeat(80));
    console.log('COPY THE FOLLOWING SQL TO EXECUTE VIA SUPABASE MCP:');
    console.log('='.repeat(80));
    
    // Clean up the SQL for direct execution
    const cleanSQL = migrationSQL
      .replace(/--> statement-breakpoint/g, '\n')
      .trim();
    
    console.log(cleanSQL);
    console.log('='.repeat(80));

    console.log('\n✨ Migration preparation completed successfully!');

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});
