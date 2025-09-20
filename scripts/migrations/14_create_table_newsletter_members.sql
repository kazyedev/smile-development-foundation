-- Migration: create_table_newsletter_members
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_newsletter_members
-- query: CREATE TABLE "newsletter_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(200) NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "newsletter_members_email_unique" UNIQUE("email")
);

CREATE TABLE "newsletter_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(200) NOT NULL,
	"is_english" boolean DEFAULT false,
	"is_arabic" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "newsletter_members_email_unique" UNIQUE("email")
);