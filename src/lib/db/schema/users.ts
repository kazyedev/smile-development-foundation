import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enum definitions matching the profile.ts types
export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "admin", 
  "content_manager",
  "viewer",
  "author",
  "default",
]);

export const userSectionEnum = pgEnum("user_section", [
  "programs",
  "projects",
  "project_categories",
  "activities",
  "news",
  "news_categories",
  "email_newsletters",
  "videos",
  "photos",
  "publications",
  "reports",
  "success_stories",
  "foundation_profile",
  "admin_accounts",
  "board_of_directors",
  "team_members",
  "jobs",
  "faqs",
  "statics",
  "donations",
  "partners",
]);

export const sectionActionEnum = pgEnum("section_action", [
  "create",
  "read",
  "update",
  "delete",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  imageUrl: varchar("image_url", { length: 500 }),
  role: userRoleEnum("role").default("default").notNull(),
  allowedSections: jsonb("allowed_sections").default([]).notNull(),
  bio: text("bio"),
  lastLogin: timestamp("last_login", { withTimezone: true }),
  isActive: boolean("is_active").default(true).notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});


// Schema for section permissions
const sectionPermissionSchema = z.object({
  section: z.enum([
    "programs",
    "projects", 
    "project_categories",
    "activities",
    "news",
    "news_categories",
    "email_newsletters",
    "videos",
    "photos",
    "publications",
    "reports",
    "success_stories",
    "foundation_profile",
    "admin_accounts",
    "board_of_directors",
    "team_members",
    "jobs",
    "faqs",
    "statics",
    "donations",
    "partners",
  ]),
  actions: z.array(z.enum(["create", "read", "update", "delete"])),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  nameEn: z.string().min(1).max(255),
  nameAr: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  imageUrl: z.string().url().max(500).optional(),
  role: z.enum(["super_admin", "admin", "content_manager", "viewer", "author", "default"]).optional(),
  allowedSections: z.array(sectionPermissionSchema).optional(),
  bio: z.string().optional(),
  lastLogin: z.date().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  id: z.string().uuid(),
});

export const selectUserSchema = createSelectSchema(users);

export const updateUserSchema = insertUserSchema.partial().omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

// Additional validation schemas
export const userPermissionSchema = z.object({
  userId: z.string().uuid(),
  section: z.enum([
    "programs",
    "projects",
    "project_categories", 
    "activities",
    "news",
    "news_categories",
    "email_newsletters",
    "videos",
    "photos",
    "publications",
    "reports",
    "success_stories",
    "foundation_profile",
    "admin_accounts",
    "board_of_directors",
    "team_members",
    "jobs",
    "faqs",
    "statics",
    "donations",
    "partners",
  ]),
  action: z.enum(["create", "read", "update", "delete"]),
});

export const userRoleUpdateSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["super_admin", "admin", "content_manager", "viewer", "author", "default"]),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type SectionPermission = z.infer<typeof sectionPermissionSchema>;
export type UserPermissionCheck = z.infer<typeof userPermissionSchema>;
export type UserRoleUpdate = z.infer<typeof userRoleUpdateSchema>;

// Helper types for better TypeScript support
export type UserRole = User["role"];
export type UserSection = SectionPermission["section"];
export type SectionAction = SectionPermission["actions"][number];
