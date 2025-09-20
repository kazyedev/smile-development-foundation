import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const newsletterMembers = pgTable("newsletter_members", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  isEnglish: boolean("is_english").default(false),
  isArabic: boolean("is_arabic").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertNewsletterMemberSchema = createInsertSchema(newsletterMembers, {
  email: z.string().email().max(200),
});

export const selectNewsletterMemberSchema = createSelectSchema(newsletterMembers);

// Types
export type NewsletterMember = typeof newsletterMembers.$inferSelect;
export type NewNewsletterMember = typeof newsletterMembers.$inferInsert;
