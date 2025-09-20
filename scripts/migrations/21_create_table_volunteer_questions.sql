-- Migration: create_table_volunteer_questions
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_volunteer_questions
-- query: CREATE TABLE "volunteer_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_en" text NOT NULL,
	"question_ar" text NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "volunteer_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_en" text NOT NULL,
	"question_ar" text NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);