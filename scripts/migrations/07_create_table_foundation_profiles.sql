-- Migration: create_table_foundation_profiles
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_foundation_profiles
-- query: CREATE TABLE "foundation_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(200) NOT NULL,
	"name_ar" varchar(200) NOT NULL,
	"address_en" varchar(500) NOT NULL,
	"address_ar" varchar(500) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"facebook" varchar(500),
	"twitter" varchar(500),
	"instagram" varchar(500),
	"linkedin" varchar(500),
	"youtube" varchar(500),
	"telegram" varchar(500),
	"bank_accounts" jsonb DEFAULT '[]'::jsonb,
	"statics" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "foundation_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_en" varchar(200) NOT NULL,
	"name_ar" varchar(200) NOT NULL,
	"address_en" varchar(500) NOT NULL,
	"address_ar" varchar(500) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"facebook" varchar(500),
	"twitter" varchar(500),
	"instagram" varchar(500),
	"linkedin" varchar(500),
	"youtube" varchar(500),
	"telegram" varchar(500),
	"bank_accounts" jsonb DEFAULT '[]'::jsonb,
	"statics" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);