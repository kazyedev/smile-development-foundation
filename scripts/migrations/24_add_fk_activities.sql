-- Migration: add_fk_activities
-- Type: FK
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: add_fk_activities
-- query: ALTER TABLE "activities" ADD CONSTRAINT "activities_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;

ALTER TABLE "activities" ADD CONSTRAINT "activities_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE cascade;