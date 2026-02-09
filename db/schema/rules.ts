import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "@/db/schema";

export const rules = pgTable("rules", {
  // Standard Auto-incrementing ID
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 255 }).notNull(),

  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),

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
