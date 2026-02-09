import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema";

export const degreeCertificate = pgTable("degree_certificates", {
  id: serial("id").primaryKey(),
  degree_certificate_name: varchar("degree_certificate_name", {
    length: 255,
  }).notNull(),
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
