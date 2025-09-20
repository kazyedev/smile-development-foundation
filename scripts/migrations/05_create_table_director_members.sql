-- Migration: create_table_director_members
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_director_members
-- query: CREATE TABLE "director_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name_en" varchar(200) NOT NULL,
	"full_name_ar" varchar(200) NOT NULL,
	"position_en" varchar(200) NOT NULL,
	"position_ar" varchar(200) NOT NULL,
	"bio_en" text,
	"bio_ar" text,
	"avatar" varchar(1000),
	"linkedin" varchar(500),
	"twitter" varchar(500)
);

CREATE TABLE "director_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name_en" varchar(200) NOT NULL,
	"full_name_ar" varchar(200) NOT NULL,
	"position_en" varchar(200) NOT NULL,
	"position_ar" varchar(200) NOT NULL,
	"bio_en" text,
	"bio_ar" text,
	"avatar" varchar(1000),
	"linkedin" varchar(500),
	"twitter" varchar(500)
);