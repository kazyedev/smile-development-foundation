-- Migration: create_enum_public
-- Type: ENUM
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: create_enum_public
-- query: CREATE TYPE "public"."volunteer_request_status" AS ENUM('pending', 'approved', 'rejected');

CREATE TYPE "public"."volunteer_request_status" AS ENUM('pending', 'approved', 'rejected');