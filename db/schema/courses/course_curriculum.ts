import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { users, courses } from "@/db/schema";
import { SectionContentItem } from "@/src/types/courses";

// -----------------------------------------------------------------------------
// 3. COURSE CURRICULUM (Sections with Embedded Content Array)
// -----------------------------------------------------------------------------
export const courseSections = pgTable("course_sections", {
  id: serial("id").primaryKey(),

  course_id: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),

  section_title: varchar("section_title", { length: 255 }).notNull(),
  section_order: integer("section_order").default(0).notNull(), // "Section No"

  // 🔄 ARRAY OF CONTENT: Stored as JSONB
  section_content: jsonb("section_content")
    .$type<SectionContentItem[]>()
    .default([])
    .notNull(),

  is_published: boolean("is_published").default(false).notNull(),

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
