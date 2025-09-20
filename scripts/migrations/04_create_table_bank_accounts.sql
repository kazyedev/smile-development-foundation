-- Migration: create_table_bank_accounts
-- Type: TABLE
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_table_bank_accounts
-- query: CREATE TABLE "bank_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"bank_name_en" varchar(200) NOT NULL,
	"bank_name_ar" varchar(200) NOT NULL,
	"bank_logo" varchar(1000) NOT NULL,
	"account_number" varchar(100) NOT NULL,
	"account_name_en" varchar(200) NOT NULL,
	"account_name_ar" varchar(200) NOT NULL,
	"account_currency" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE "bank_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"bank_name_en" varchar(200) NOT NULL,
	"bank_name_ar" varchar(200) NOT NULL,
	"bank_logo" varchar(1000) NOT NULL,
	"account_number" varchar(100) NOT NULL,
	"account_name_en" varchar(200) NOT NULL,
	"account_name_ar" varchar(200) NOT NULL,
	"account_currency" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);