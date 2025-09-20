-- Migration: create_table_seo_details
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_seo_details
-- query: CREATE TABLE "seo_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "seo_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);