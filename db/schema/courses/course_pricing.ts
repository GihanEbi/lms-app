import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";
import {
  courseLanguageOptions,
  currencyOptions,
  discountTypeOptions,
} from "@/src/constants/courseConstants";
import { courses } from "./course_basic_information";

// --- ENUMS ---
export const courseLanguageEnum = pgEnum(
  "course_language",
  courseLanguageOptions,
);

export const currencyEnum = pgEnum("course_currency", currencyOptions);

export const discountTypeEnum = pgEnum("discount_type", discountTypeOptions);

// --- COURSES TABLE UPDATE ---
// (Append these columns to your existing courses table definition)
export const courses_pricing = pgTable("courses_pricing", {
  id: serial("id").primaryKey(),

  course_id: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),
  // Pricing & Settings Fields
  is_paid: boolean("is_paid").default(false).notNull(), // Free vs Paid tier
  price: decimal("price", { precision: 10, scale: 2 }), // e.g. 99.99
  currency: currencyEnum("currency").default(currencyOptions.USD),

  language: courseLanguageEnum("language")
    .default(courseLanguageOptions.ENGLISH)
    .notNull(),
  has_certificate: boolean("has_certificate").default(false).notNull(),

  // ... [Existing fields: status, created_at, etc.] ...
});

// --- COUPONS TABLE ---
export const course_coupons = pgTable("course_coupons", {
  id: serial("id").primaryKey(),
  course_id: integer("course_id")
    .references(() => courses.id, { onDelete: "cascade" })
    .notNull(),

  code: varchar("code", { length: 50 }).notNull(), // e.g., "EARLYBIRD"
  discount_type: discountTypeEnum("discount_type")
    .default(discountTypeOptions.PERCENTAGE)
    .notNull(),
  discount_value: decimal("discount_value", {
    precision: 10,
    scale: 2,
  }).notNull(), // e.g., 20.00

  max_uses: integer("max_uses"), // Optional limit
  is_active: boolean("is_active").default(true).notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});
