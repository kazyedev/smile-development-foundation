#!/usr/bin/env node

const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

// Database connection
const DATABASE_URL = "postgresql://postgres.lisfqqpzsqrccikkffqr:733124715**AAaa**@aws-0-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

// Existing tables that we should NOT create
const EXISTING_TABLES = ['projects', 'programs', 'media_categories', 'videos', 'images'];

// Function to read migration file and filter out existing tables
function getNewTablesSQL() {
  const migrationPath = path.resolve(process.cwd(), 'src/lib/db/migrations/0003_opposite_madame_web.sql');
  
  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath);
    process.exit(1);
  }

  const content = fs.readFileSync(migrationPath, 'utf-8');
  
  // Split into individual statements
  const statements = content
    .split('--> statement-breakpoint')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);

  // Filter out statements for existing tables
  const newStatements = statements.filter(statement => {
    // Check if this statement is trying to create an existing table
    for (const existingTable of EXISTING_TABLES) {
      if (statement.includes(`CREATE TABLE "${existingTable}"`) || 
          statement.includes(`CREATE TABLE ${existingTable}`)) {
        console.log(`⏭️  Skipping existing table: ${existingTable}`);
        return false;
      }
    }
    return true;
  });

  return newStatements;
}

// Main execution function
async function createMissingTables() {
  const sql = postgres(DATABASE_URL);
  
  try {
    console.log('🚀 Starting database migration for missing tables...\n');
    
    const statements = getNewTablesSQL();
    console.log(`📋 Found ${statements.length} statements to execute\n`);

    let successCount = 0;
    let errors = [];

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (!statement) continue;

      // Extract table/type name for logging
      let entityName = 'unknown';
      let entityType = 'STATEMENT';
      
      if (statement.includes('CREATE TYPE')) {
        const match = statement.match(/CREATE TYPE.*?"([^"]+)"/i);
        if (match) {
          entityName = match[1];
          entityType = 'ENUM';
        }
      } else if (statement.includes('CREATE TABLE')) {
        const match = statement.match(/CREATE TABLE "?([^"\s(]+)"?\s*\(/i);
        if (match) {
          entityName = match[1];
          entityType = 'TABLE';
        }
      } else if (statement.includes('ALTER TABLE') && statement.includes('ADD CONSTRAINT')) {
        const match = statement.match(/ALTER TABLE "?([^"\s]+)"?\s/i);
        if (match) {
          entityName = `FK for ${match[1]}`;
          entityType = 'CONSTRAINT';
        }
      }

      console.log(`⚡ ${i + 1}/${statements.length}: Creating ${entityType} ${entityName}`);

      try {
        await sql.unsafe(statement);
        console.log(`   ✅ Success`);
        successCount++;
      } catch (error) {
        console.error(`   ❌ Failed: ${error.message}`);
        errors.push({ 
          statement: i + 1, 
          entity: entityName, 
          error: error.message,
          sql: statement.substring(0, 100) + '...'
        });
      }
    }

    console.log('\n📊 MIGRATION SUMMARY:');
    console.log(`   ✅ Successfully executed: ${successCount}`);
    console.log(`   ❌ Failed: ${errors.length}`);

    if (errors.length > 0) {
      console.log('\n❌ ERRORS:');
      errors.forEach(error => {
        console.log(`   ${error.statement}. ${error.entity}: ${error.error}`);
      });
    }

    // Check final table count
    console.log('\n🔍 Verifying tables...');
    const result = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
    
    console.log('\n📋 CURRENT TABLES IN DATABASE:');
    result.forEach((row, index) => {
      console.log(`${index + 1}.`.padStart(3) + ` ${row.table_name}`);
    });

    console.log(`\n✨ Migration completed! Database now has ${result.length} tables.`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

// Run the script
createMissingTables().catch(error => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});
