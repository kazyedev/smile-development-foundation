-- Migration: add_fk_publications
-- Type: FK
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: add_fk_publications
-- query: ALTER TABLE "publications" ADD CONSTRAINT "publications_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;

ALTER TABLE "publications" ADD CONSTRAINT "publications_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;