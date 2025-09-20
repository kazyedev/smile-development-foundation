#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read and parse the migration file
function parseMigrationFile() {
  const migrationPath = path.resolve(process.cwd(), 'src/lib/db/migrations/0003_opposite_madame_web.sql');
  
  if (!fs.existsSync(migrationPath)) {
    console.error('❌ Migration file not found:', migrationPath);
    console.log('Please run: npm run db:generate first');
    process.exit(1);
  }

  const content = fs.readFileSync(migrationPath, 'utf-8');
  
  // Split into individual statements
  const statements = content
    .split('--> statement-breakpoint')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0);

  return statements;
}

// Extract migration info
function extractMigrationInfo(statements) {
  const migrations = [];
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    let name = `migration_${i + 1}`;
    let type = 'OTHER';
    
    // Identify statement type
    if (statement.includes('CREATE TYPE')) {
      type = 'ENUM';
      const match = statement.match(/CREATE TYPE.*?"([^"]+)"/i);
      if (match) name = `create_enum_${match[1]}`;
    } else if (statement.includes('CREATE TABLE')) {
      type = 'TABLE';
      const match = statement.match(/CREATE TABLE "?([^"\s(]+)"?\s*\(/i);
      if (match) name = `create_table_${match[1]}`;
    } else if (statement.includes('ALTER TABLE') && statement.includes('ADD CONSTRAINT')) {
      type = 'FK';
      const match = statement.match(/ALTER TABLE "?([^"\s]+)"?\s/i);
      if (match) name = `add_fk_${match[1]}`;
    }

    migrations.push({
      name,
      type,
      query: statement.trim()
    });
  }
  
  return migrations;
}

// Display the migrations for manual execution
function displayMigrations() {
  console.log('🚀 Database Migration Script');
  console.log('==========================\n');
  
  const statements = parseMigrationFile();
  const migrations = extractMigrationInfo(statements);
  
  console.log(`📋 Found ${migrations.length} migration statements\n`);
  
  console.log('📝 MIGRATION COMMANDS TO EXECUTE:');
  console.log('Copy and paste each command below into your AI assistant:\n');
  
  migrations.forEach((migration, index) => {
    console.log(`\n${index + 1}. ${migration.type}: ${migration.name}`);
    console.log('=' .repeat(60));
    console.log('Command to execute:');
    console.log('```');
    console.log(`call_mcp_tool apply_migration`);
    console.log(`name: ${migration.name}`);
    console.log(`query: ${migration.query}`);
    console.log('```');
    console.log('-'.repeat(60));
  });

  console.log('\n✨ Instructions:');
  console.log('1. Copy each command above');
  console.log('2. Paste it to your AI assistant');
  console.log('3. Wait for confirmation before proceeding to the next');
  console.log('4. Execute them in order to maintain foreign key integrity\n');

  // Also create separate files for easier copy-paste
  const migrationDir = path.resolve(process.cwd(), 'scripts/migrations');
  if (!fs.existsSync(migrationDir)) {
    fs.mkdirSync(migrationDir, { recursive: true });
  }

  migrations.forEach((migration, index) => {
    const fileName = `${String(index + 1).padStart(2, '0')}_${migration.name}.sql`;
    const filePath = path.join(migrationDir, fileName);
    
    const content = `-- Migration: ${migration.name}
-- Type: ${migration.type}
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: ${migration.name}
-- query: ${migration.query}

${migration.query}`;

    fs.writeFileSync(filePath, content);
  });

  console.log(`📁 Individual migration files created in: scripts/migrations/`);
  console.log('   You can also copy SQL directly from these files\n');
}

// Main execution
function main() {
  try {
    displayMigrations();
  } catch (error) {
    console.error('💥 Error:', error.message);
    process.exit(1);
  }
}

main();
