import {
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  fullNameEn: varchar("full_name_en", { length: 200 }).notNull(),
  fullNameAr: varchar("full_name_ar", { length: 200 }).notNull(),
  positionEn: varchar("position_en", { length: 200 }).notNull(),
  positionAr: varchar("position_ar", { length: 200 }).notNull(),
  bioEn: text("bio_en"),
  bioAr: text("bio_ar"),
  avatarUrl: varchar("avatar_url", { length: 1000 }),
  linkedin: varchar("linkedin", { length: 500 }),
  twitter: varchar("twitter", { length: 500 }),
});

// Zod schemas for validation
export const insertTeamMemberSchema = createInsertSchema(teamMembers, {
  fullNameEn: z.string().min(1).max(200),
  fullNameAr: z.string().min(1).max(200),
  positionEn: z.string().min(1).max(200),
  positionAr: z.string().min(1).max(200),
  bioEn: z.string().optional(),
  bioAr: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

export const selectTeamMemberSchema = createSelectSchema(teamMembers);

// Types
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
