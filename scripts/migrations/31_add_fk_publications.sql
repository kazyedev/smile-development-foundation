-- Migration: add_fk_publications
-- Type: FK
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: add_fk_publications
-- query: ALTER TABLE "publications" ADD CONSTRAINT "publications_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE cascade;

ALTER TABLE "publications" ADD CONSTRAINT "publications_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE cascade;