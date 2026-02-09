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

export const subjectCategories = pgTable("subject_categories", {
  id: serial("id").primaryKey(),
  subject_category_name: varchar("subject_category_name", {
    length: 255,
  }).notNull(),
  description: text("description"),
  is_active: boolean("is_active").default(true).notNull(),

  // Audit Fields
  user_created: integer("user_created").references(() => users.id, {
    onDelete: "set null",
  }),
  user_modified: integer("user_modified").references(() => users.id, {
    onDelete: "set null",
  }),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
