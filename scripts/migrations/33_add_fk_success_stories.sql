-- Migration: add_fk_success_stories
-- Type: FK
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: add_fk_success_stories
-- query: ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;

ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;