-- Migration: create_table_partners
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_partners
-- query: CREATE TABLE "partners" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(200) NOT NULL,
	"name_ar" varchar(200) NOT NULL,
	"logo_url" varchar(1000)
);

CREATE TABLE "partners" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(200) NOT NULL,
	"name_ar" varchar(200) NOT NULL,
	"logo_url" varchar(1000)
);