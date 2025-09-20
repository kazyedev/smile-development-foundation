-- Migration: create_table_publications
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_publications
-- query: CREATE TABLE "publications" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"url" varchar(1000) NOT NULL,
	"program_id" bigint,
	"project_id" bigint,
	"activity_id" bigint,
	"category_id" bigint,
	"featured_image_url" varchar(1000),
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"page_views" integer DEFAULT 0,
	"downloads" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "publications_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "publications_slug_ar_unique" UNIQUE("slug_ar")
);

CREATE TABLE "publications" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"url" varchar(1000) NOT NULL,
	"program_id" bigint,
	"project_id" bigint,
	"activity_id" bigint,
	"category_id" bigint,
	"featured_image_url" varchar(1000),
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"keywords_en" text[] DEFAULT '{}',
	"keywords_ar" text[] DEFAULT '{}',
	"tags_en" text[] DEFAULT '{}',
	"tags_ar" text[] DEFAULT '{}',
	"page_views" integer DEFAULT 0,
	"downloads" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "publications_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "publications_slug_ar_unique" UNIQUE("slug_ar")
);