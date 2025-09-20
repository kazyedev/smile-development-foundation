-- Migration: create_table_news_categories
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_news_categories
-- query: CREATE TABLE "news_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(200) NOT NULL,
	"name_ar" varchar(200) NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"color" varchar(20),
	"icon" varchar(100),
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "news_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "news_categories_slug_ar_unique" UNIQUE("slug_ar")
);

CREATE TABLE "news_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(200) NOT NULL,
	"name_ar" varchar(200) NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"description_en" text,
	"description_ar" text,
	"color" varchar(20),
	"icon" varchar(100),
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "news_categories_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "news_categories_slug_ar_unique" UNIQUE("slug_ar")
);