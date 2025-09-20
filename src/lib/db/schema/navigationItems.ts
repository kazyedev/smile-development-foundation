import {
  jsonb,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Define the navigation item schema recursively
const BaseNavigationItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
});

export const NavigationItemSchema: z.ZodType<{
  id: string;
  label: string;
  href: string;
  children?: Array<{
    id: string;
    label: string;
    href: string;
    children?: any[];
  }>;
}> = BaseNavigationItemSchema.extend({
  children: z.lazy(() => z.array(NavigationItemSchema)).optional(),
});

export const navigationItems = pgTable("navigation_items", {
  id: varchar("id", { length: 100 }).primaryKey(),
  label: varchar("label", { length: 200 }).notNull(),
  href: varchar("href", { length: 1000 }).notNull(),
  children: jsonb("children").$type<z.infer<typeof NavigationItemSchema>[]>(),
});

// Zod schemas for validation
export const insertNavigationItemSchema = createInsertSchema(navigationItems, {
  id: z.string().min(1).max(100),
  label: z.string().min(1).max(200),
  href: z.string().min(1).max(1000),
  children: z.array(NavigationItemSchema).optional(),
});

export const selectNavigationItemSchema = createSelectSchema(navigationItems);

// Types
export type NavigationItem = typeof navigationItems.$inferSelect;
export type NewNavigationItem = typeof navigationItems.$inferInsert;
