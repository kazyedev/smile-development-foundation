-- Migration: create_table_activities
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_activities
-- query: CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_arabic" boolean DEFAULT false,
	"is_english" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"date" timestamp with time zone,
	"content_en" text NOT NULL,
	"content_ar" text NOT NULL,
	"other_images_url" text[] DEFAULT '{}',
	"program_id" bigint NOT NULL,
	"project_id" bigint,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "activities_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "activities_slug_ar_unique" UNIQUE("slug_ar")
);

CREATE TABLE "activities" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_arabic" boolean DEFAULT false,
	"is_english" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"date" timestamp with time zone,
	"content_en" text NOT NULL,
	"content_ar" text NOT NULL,
	"other_images_url" text[] DEFAULT '{}',
	"program_id" bigint NOT NULL,
	"project_id" bigint,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "activities_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "activities_slug_ar_unique" UNIQUE("slug_ar")
);