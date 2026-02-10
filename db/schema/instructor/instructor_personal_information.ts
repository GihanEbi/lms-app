import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  date,
} from "drizzle-orm/pg-core";
import { users, degreeCertificate } from "@/db/schema";
import { sql } from "drizzle-orm";
import { instructorRegistrationStatusConstants } from "@/src/constants/instructorConstants";

export const instructors = pgTable("instructor_personal_information", {
  id: serial("id").primaryKey(),
  code: varchar("code")
    .generatedAlwaysAs(sql`'IN' || LPAD("id"::text, 5, '0')`)
    .notNull(),
  full_name: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: text("password_hash").notNull(), // Store hash, not plain text
  profile_picture_url: text("profile_picture_url"),
  phone_number: varchar("phone_number", { length: 50 }).notNull().unique(),
  date_of_birth: date("date_of_birth"),
  address: text("address"),

  // Link to Degree Certificate
  highest_degree_certificate_id: integer(
    "highest_degree_certificate_id",
  ).references(() => degreeCertificate.id, { onDelete: "set null" }),

  years_of_experience: integer("years_of_experience").default(0),
  resume_url: text("resume_url"),

  is_active: boolean("is_active").default(true).notNull(),
  registration_status: varchar("registration_status", { length: 50 })
    .default(instructorRegistrationStatusConstants.PENDING)
    .notNull(),

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
