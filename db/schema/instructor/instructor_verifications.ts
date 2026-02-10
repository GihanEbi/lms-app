import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  jsonb, // 👈 Import jsonb
} from "drizzle-orm/pg-core";
import { users, instructors } from "@/db/schema";
import { certificateVerificationConstants } from "@/src/constants/instructorConstants";

export const verificationStatusEnum = pgEnum(
  "verification_status",
  certificateVerificationConstants,
);

export const instructorVerifications = pgTable("instructor_verifications", {
  id: serial("id").primaryKey(),
  instructor_id: integer("instructor_id")
    .references(() => instructors.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  // 🔄 CHANGED: Now using JSONB to store arrays of URL strings
  identity_document_urls: jsonb("identity_document_urls")
    .$type<string[]>()
    .notNull(),
  certification_document_urls: jsonb("certification_document_urls")
    .$type<string[]>()
    .notNull(),

  professional_license_number: varchar("professional_license_number", {
    length: 100,
  }),

  background_check_consent: boolean("background_check_consent")
    .default(false)
    .notNull(),
  digital_signature: varchar("digital_signature", { length: 255 }).notNull(),

  status: verificationStatusEnum("status")
    .default(certificateVerificationConstants.PENDING)
    .notNull(),
  rejection_reason: text("rejection_reason"),

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
