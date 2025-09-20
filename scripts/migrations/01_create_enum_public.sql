-- Migration: create_enum_public
-- Type: ENUM
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_enum_public
-- query: CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'contract', 'internship', 'volunteer');

CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'contract', 'internship', 'volunteer');