import {
  jsonb,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// JSON Schema types for complex fields
export const FoundationStaticSchema = z.object({
  icon: z.string(),
  titleEn: z.string(),
  titleAr: z.string(),
  value: z.number(),
});

export const BankAccountSchema = z.object({
  id: z.number(),
  bankNameEn: z.string(),
  bankNameAr: z.string(),
  bankLogo: z.string(),
  accountNumber: z.string(),
  accountNameEn: z.string(),
  accountNameAr: z.string(),
  accountCurrency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const foundationProfiles = pgTable("foundation_profiles", {
  id: serial("id").primaryKey(),
  nameEn: varchar("name_en", { length: 200 }).notNull(),
  nameAr: varchar("name_ar", { length: 200 }).notNull(),
  addressEn: varchar("address_en", { length: 500 }).notNull(),
  addressAr: varchar("address_ar", { length: 500 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  facebook: varchar("facebook", { length: 500 }),
  twitter: varchar("twitter", { length: 500 }),
  instagram: varchar("instagram", { length: 500 }),
  linkedin: varchar("linkedin", { length: 500 }),
  youtube: varchar("youtube", { length: 500 }),
  telegram: varchar("telegram", { length: 500 }),
  bankAccounts: jsonb("bank_accounts").$type<z.infer<typeof BankAccountSchema>[]>().default([]),
  statics: jsonb("statics").$type<z.infer<typeof FoundationStaticSchema>[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertFoundationProfileSchema = createInsertSchema(foundationProfiles, {
  nameEn: z.string().min(1).max(200),
  nameAr: z.string().min(1).max(200),
  addressEn: z.string().min(1).max(500),
  addressAr: z.string().min(1).max(500),
  email: z.string().email().max(100),
  phone: z.string().min(1).max(20),
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  youtube: z.string().url().optional(),
  telegram: z.string().url().optional(),
  bankAccounts: z.array(BankAccountSchema).optional(),
  statics: z.array(FoundationStaticSchema).optional(),
});

export const selectFoundationProfileSchema = createSelectSchema(foundationProfiles);

// Types
export type FoundationProfile = typeof foundationProfiles.$inferSelect;
export type NewFoundationProfile = typeof foundationProfiles.$inferInsert;
export type FoundationProfileStatic = z.infer<typeof FoundationStaticSchema>;
export type FoundationProfileBankAccount = z.infer<typeof BankAccountSchema>;
