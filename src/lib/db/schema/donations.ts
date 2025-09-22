import {
  pgTable,
  serial,
  timestamp,
  varchar,
  decimal,
  text,
  integer,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { bankAccounts } from "./bankAccounts";

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  method: varchar("method", { length: 20 }).notNull(),
  frequency: varchar("frequency", { length: 10 }).notNull().default("once"),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  
  // Donor information
  donorName: varchar("donor_name", { length: 200 }),
  donorEmail: varchar("donor_email", { length: 200 }).notNull(),
  donorNote: text("donor_note"),
  
  // Payment method specific data
  stripeSessionId: varchar("stripe_session_id", { length: 200 }),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 200 }),
  bankAccountId: integer("bank_account_id").references(() => bankAccounts.id),
  
  // File attachment URLs (files stored in Supabase storage)
  transferAttachmentUrl: varchar("transfer_attachment_url", { length: 1000 }),
  depositAttachmentUrl: varchar("deposit_attachment_url", { length: 1000 }),
  
  // Metadata
  metadata: jsonb("metadata").default({}),
  
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

// Zod schemas for validation
export const insertDonationSchema = createInsertSchema(donations, {
  amount: z.string().or(z.number()).transform((val) => Number(val)).refine((val) => val > 0, "Amount must be positive"),
  currency: z.enum(["USD", "SAR", "AED", "YER"]),
  method: z.enum(["stripe", "cash_transfer", "bank_deposit"]),
  frequency: z.enum(["once", "monthly"]),
  status: z.enum(["pending", "completed", "failed", "cancelled"]),
  donorEmail: z.string().email(),
  donorName: z.string().min(1).max(200).optional(),
  donorNote: z.string().max(5000).optional(),
});

export const selectDonationSchema = createSelectSchema(donations);

// Types
export type Donation = typeof donations.$inferSelect;
export type NewDonation = typeof donations.$inferInsert;

// Currency configuration
export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  SAR: { symbol: 'ر.س', name: 'Saudi Riyal' },
  AED: { symbol: 'د.إ', name: 'UAE Dirham' },
  YER: { symbol: 'ر.ي', name: 'Yemeni Rial' },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;
