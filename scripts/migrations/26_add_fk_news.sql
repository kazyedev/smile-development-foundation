-- Migration: add_fk_news
-- Type: FK
-- Command for AI Assistant:
-- call_mcp_tool apply_migration
-- name: add_fk_news
-- query: ALTER TABLE "news" ADD CONSTRAINT "news_category_id_news_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."news_categories"("id") ON DELETE set null ON UPDATE cascade;

ALTER TABLE "news" ADD CONSTRAINT "news_category_id_news_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."news_categories"("id") ON DELETE set null ON UPDATE cascade;