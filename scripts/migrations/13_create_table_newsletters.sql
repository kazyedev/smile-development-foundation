-- Migration: create_table_newsletters
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_newsletters
-- query: CREATE TABLE "newsletters" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"content_en" text NOT NULL,
	"content_ar" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "newsletters" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"content_en" text NOT NULL,
	"content_ar" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);