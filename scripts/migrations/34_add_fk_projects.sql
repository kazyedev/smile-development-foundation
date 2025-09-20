-- Migration: add_fk_projects
-- Type: FK
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: add_fk_projects
-- query: ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_project_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."project_categories"("id") ON DELETE set null ON UPDATE cascade;

ALTER TABLE "projects" ADD CONSTRAINT "projects_category_id_project_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."project_categories"("id") ON DELETE set null ON UPDATE cascade;