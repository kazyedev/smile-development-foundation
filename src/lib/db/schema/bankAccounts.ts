import {
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const bankAccounts = pgTable("bank_accounts", {
  id: serial("id").primaryKey(),
  bankNameEn: varchar("bank_name_en", { length: 200 }).notNull(),
  bankNameAr: varchar("bank_name_ar", { length: 200 }).notNull(),
  bankLogo: varchar("bank_logo", { length: 1000 }).notNull(),
  accountNumber: varchar("account_number", { length: 100 }).notNull(),
  accountNameEn: varchar("account_name_en", { length: 200 }).notNull(),
  accountNameAr: varchar("account_name_ar", { length: 200 }).notNull(),
  accountCurrency: varchar("account_currency", { length: 10 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Zod schemas for validation
export const insertBankAccountSchema = createInsertSchema(bankAccounts, {
  bankNameEn: z.string().min(1).max(200),
  bankNameAr: z.string().min(1).max(200),
  bankLogo: z.string().url(),
  accountNumber: z.string().min(1).max(100),
  accountNameEn: z.string().min(1).max(200),
  accountNameAr: z.string().min(1).max(200),
  accountCurrency: z.string().min(1).max(10),
});

export const selectBankAccountSchema = createSelectSchema(bankAccounts);

// Types
export type BankAccount = typeof bankAccounts.$inferSelect;
export type NewBankAccount = typeof bankAccounts.$inferInsert;
