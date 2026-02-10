import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";
import { users, instructors, subjects } from "@/db/schema";

// 1. Instructor Preferences (1-to-1 with Instructor)
export const instructorPreferences = pgTable("instructor_preferences", {
  id: serial("id").primaryKey(),
  instructor_id: integer("instructor_id")
    .references(() => instructors.id, { onDelete: "cascade" }) // If instructor deleted, prefs gone
    .notNull()
    .unique(), // Ensures 1-to-1 relationship

  teaching_methodology: text("teaching_methodology"),
  student_capacity: integer("student_capacity").default(50),

  // Stores the grid: [{ day: 'Mon', slots: ['morning', 'evening'] }]
  weekly_availability: jsonb("weekly_availability").default([]),

  linkedin_url: varchar("linkedin_url", { length: 500 }),
  portfolio_url: varchar("portfolio_url", { length: 500 }),

  // Audit
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

// 2. Instructor Expertise (Many-to-Many Join Table)
export const instructorExpertise = pgTable(
  "instructor_expertise",
  {
    instructor_id: integer("instructor_id")
      .references(() => instructors.id, { onDelete: "cascade" })
      .notNull(),
    subject_id: integer("subject_id")
      .references(() => subjects.id, { onDelete: "cascade" })
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.instructor_id, t.subject_id] }), // Composite Primary Key
  }),
);
