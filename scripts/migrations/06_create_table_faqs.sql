-- Migration: create_table_faqs
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_faqs
-- query: CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_en" text NOT NULL,
	"question_ar" text NOT NULL,
	"answer_en" text NOT NULL,
	"answer_ar" text NOT NULL,
	"views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "faqs" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_en" text NOT NULL,
	"question_ar" text NOT NULL,
	"answer_en" text NOT NULL,
	"answer_ar" text NOT NULL,
	"views" integer DEFAULT 0,
	"is_published" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);