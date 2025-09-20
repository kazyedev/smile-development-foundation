import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  titleEn: varchar("title_en", { length: 500 }).notNull(),
  titleAr: varchar("title_ar", { length: 500 }).notNull(),
  contentEn: text("content_en").notNull(),
  contentAr: text("content_ar").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertNewsletterSchema = createInsertSchema(newsletters, {
  titleEn: z.string().min(1).max(500),
  titleAr: z.string().min(1).max(500),
  contentEn: z.string().min(1),
  contentAr: z.string().min(1),
});

export const selectNewsletterSchema = createSelectSchema(newsletters);

// Types
export type Newsletter = typeof newsletters.$inferSelect;
export type NewNewsletter = typeof newsletters.$inferInsert;
