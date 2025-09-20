import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  nameEn: varchar("name_en", { length: 200 }).notNull(),
  nameAr: varchar("name_ar", { length: 200 }).notNull(),
  logoUrl: varchar("logo_url", { length: 1000 }),
});

// Zod schemas for validation
export const insertPartnerSchema = createInsertSchema(partners, {
  nameEn: z.string().min(1).max(200),
  nameAr: z.string().min(1).max(200),
  logoUrl: z.string().url().optional(),
});

export const selectPartnerSchema = createSelectSchema(partners);

// Types
export type Partner = typeof partners.$inferSelect;
export type NewPartner = typeof partners.$inferInsert;
