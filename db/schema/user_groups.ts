import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "@/db/schema";

export const userGroups = pgTable("user_groups", {
  id: serial("id").primaryKey(),
  code: varchar("code")
    .generatedAlwaysAs(sql`'UG' || LPAD("id"::text, 5, '0')`)
    .notNull(),

  // Group names should usually be unique so you don't have two "Admins"
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  is_active: boolean("is_active").default(true).notNull(),

  // Foreign Keys pointing to the Users table
  // "onDelete: set null" means if the user is deleted, this field becomes null (instead of deleting the rule)
  user_created: integer("user_created").references(() => users.id, {
    onDelete: "set null",
  }),
  user_modified: integer("user_modified").references(() => users.id, {
    onDelete: "set null",
  }),

  created_at: timestamp("created_at").defaultNow().notNull(),
  // Optional: It is good practice to have updated_at when you have user_modified
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
