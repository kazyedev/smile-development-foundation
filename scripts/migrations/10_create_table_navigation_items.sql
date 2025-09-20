-- Migration: create_table_navigation_items
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_navigation_items
-- query: CREATE TABLE "navigation_items" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"label" varchar(200) NOT NULL,
	"href" varchar(1000) NOT NULL,
	"children" jsonb
);

CREATE TABLE "navigation_items" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"label" varchar(200) NOT NULL,
	"href" varchar(1000) NOT NULL,
	"children" jsonb
);