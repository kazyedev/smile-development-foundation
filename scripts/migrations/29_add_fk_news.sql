-- Migration: add_fk_news
-- Type: FK
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: add_fk_news
-- query: ALTER TABLE "news" ADD CONSTRAINT "news_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE set null ON UPDATE cascade;

ALTER TABLE "news" ADD CONSTRAINT "news_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE set null ON UPDATE cascade;