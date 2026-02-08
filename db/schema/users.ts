import {
  pgTable,
  serial,
  varchar,
  boolean,
  integer,
  timestamp,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
// We import userGroups to link the foreign key.
// Ensure this path points to where userGroups is exported, or use the centralized schema file.
import { userGroups } from "@/db/schema";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  code: varchar("code")
    .generatedAlwaysAs(sql`'US' || LPAD("id"::text, 5, '0')`)
    .notNull(),
  full_name: varchar("full_name", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  group_id: integer("group_id")
    .notNull()
    .references((): AnyPgColumn => userGroups.id, { onDelete: "restrict" }),

  // Foreign Keys pointing to the Users table
  // "onDelete: set null" means if the user is deleted, this field becomes null (instead of deleting the rule)
  user_created : integer("user_created").references((): AnyPgColumn => users.id, {
    onDelete: "set null",
  }),
  user_modified: integer("user_modified").references(
    (): AnyPgColumn => users.id,
    {
      onDelete: "set null",
    },
  ),

  created_at: timestamp("created_at").defaultNow().notNull(),
  // Optional: It is good practice to have updated_at when you have user_modified
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
