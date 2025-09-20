-- Migration: create_table_hero_slides
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_hero_slides
-- query: CREATE TABLE "hero_slides" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"caption_en" text NOT NULL,
	"caption_ar" text NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "hero_slides" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"caption_en" text NOT NULL,
	"caption_ar" text NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);