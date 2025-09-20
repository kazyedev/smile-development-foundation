-- Migration: add_fk_news
-- Type: FK
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: add_fk_news
-- query: ALTER TABLE "news" ADD CONSTRAINT "news_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;

ALTER TABLE "news" ADD CONSTRAINT "news_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE set null ON UPDATE cascade;