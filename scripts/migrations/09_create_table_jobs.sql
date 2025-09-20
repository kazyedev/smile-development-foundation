-- Migration: create_table_jobs
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_jobs
-- query: CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"description_en" text NOT NULL,
	"description_ar" text NOT NULL,
	"available_positions" integer NOT NULL,
	"requirements_en" text[] DEFAULT '{}',
	"requirements_ar" text[] DEFAULT '{}',
	"responsibilities_en" text[] DEFAULT '{}',
	"responsibilities_ar" text[] DEFAULT '{}',
	"location_en" varchar(200) NOT NULL,
	"location_ar" varchar(200) NOT NULL,
	"type" "job_type" NOT NULL,
	"apply_url" varchar(1000) NOT NULL,
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "jobs_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "jobs_slug_ar_unique" UNIQUE("slug_ar")
);

CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"title_en" varchar(500) NOT NULL,
	"title_ar" varchar(500) NOT NULL,
	"slug_en" varchar(200) NOT NULL,
	"slug_ar" varchar(200) NOT NULL,
	"description_en" text NOT NULL,
	"description_ar" text NOT NULL,
	"available_positions" integer NOT NULL,
	"requirements_en" text[] DEFAULT '{}',
	"requirements_ar" text[] DEFAULT '{}',
	"responsibilities_en" text[] DEFAULT '{}',
	"responsibilities_ar" text[] DEFAULT '{}',
	"location_en" varchar(200) NOT NULL,
	"location_ar" varchar(200) NOT NULL,
	"type" "job_type" NOT NULL,
	"apply_url" varchar(1000) NOT NULL,
	"page_views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "jobs_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "jobs_slug_ar_unique" UNIQUE("slug_ar")
);