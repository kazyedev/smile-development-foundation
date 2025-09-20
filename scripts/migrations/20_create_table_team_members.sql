-- Migration: create_table_team_members
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_team_members
-- query: CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name_en" varchar(200) NOT NULL,
	"full_name_ar" varchar(200) NOT NULL,
	"position_en" varchar(200) NOT NULL,
	"position_ar" varchar(200) NOT NULL,
	"bio_en" text,
	"bio_ar" text,
	"avatar_url" varchar(1000),
	"linkedin" varchar(500),
	"twitter" varchar(500)
);

CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name_en" varchar(200) NOT NULL,
	"full_name_ar" varchar(200) NOT NULL,
	"position_en" varchar(200) NOT NULL,
	"position_ar" varchar(200) NOT NULL,
	"bio_en" text,
	"bio_ar" text,
	"avatar_url" varchar(1000),
	"linkedin" varchar(500),
	"twitter" varchar(500)
);