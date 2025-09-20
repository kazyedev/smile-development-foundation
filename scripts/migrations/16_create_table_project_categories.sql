-- Migration: create_table_project_categories
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_project_categories
-- query: CREATE TABLE "project_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "project_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "project_categories_slug_ar_unique" UNIQUE("slug_ar")
);

CREATE TABLE "project_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"featured_image_url" varchar(1000) NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "project_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "project_categories_slug_ar_unique" UNIQUE("slug_ar")
);