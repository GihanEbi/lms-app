import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users, instructors, subjectCategories } from "@/db/schema"; // Import existing tables
import { courseLevels, courseStatus } from "@/src/constants/courseConstants";

export const courseLevelEnum = pgEnum("course_level", courseLevels);

export const courseStatusEnum = pgEnum("course_status", courseStatus);

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),

  instructor_id: integer("instructor_id")
    .references(() => instructors.id, { onDelete: "restrict" })
    .notNull(),

  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),

  // 🔄 CHANGED: Now a Foreign Key to subject_categories
  category_id: integer("category_id")
    .references(() => subjectCategories.id, { onDelete: "set null" })
    .notNull(),

  level: courseLevelEnum("level").default(courseLevels.BEGINNER),
  description: text("description"),
  thumbnail_url: text("thumbnail_url"),
  promo_video_url: text("promo_video_url"),

  status: courseStatusEnum("status").default(courseStatus.DRAFT).notNull(),
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
