-- Migration: create_table_volunteer_requests
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_volunteer_requests
-- query: CREATE TABLE "volunteer_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"cv_url" varchar(1000) NOT NULL,
	"questions_answers" jsonb DEFAULT '[]'::jsonb,
	"status" "volunteer_request_status" DEFAULT 'pending',
	"applied_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "volunteer_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"cv_url" varchar(1000) NOT NULL,
	"questions_answers" jsonb DEFAULT '[]'::jsonb,
	"status" "volunteer_request_status" DEFAULT 'pending',
	"applied_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);