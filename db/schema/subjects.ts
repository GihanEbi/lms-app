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
import { subjectCategories } from "@/db/schema"; // Import the parent table

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  subject_name: varchar("subject_name", { length: 255 }).notNull(),
  description: text("description"),
  is_active: boolean("is_active").default(true).notNull(),

  // Foreign Key to Subject Categories
  subject_category_id: integer("subject_category_id")
    .references(() => subjectCategories.id, { onDelete: "set null" })
    .notNull(), // Assuming a subject MUST belong to a category

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
