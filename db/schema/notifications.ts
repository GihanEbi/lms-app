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
import { users } from "@/db/schema"; // Import system users
import {
  notificationTypes,
  systemUserTypes,
} from "@/src/constants/systemConstants";

// Define Enums based on your constants
export const userTypeEnum = pgEnum("user_type", systemUserTypes);

export const notificationTypeEnum = pgEnum(
  "notification_type",
  notificationTypes,
);

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),

  // Polymorphic Receiver Logic:
  // if user_type = 'system' -> refers to users.id
  // if user_type = 'instructor' -> refers to instructor_personal_information.id
  // if user_type = 'student' -> refers to student_personal_information.id
  receiver_id: integer("receiver_id").notNull(),

  user_type: userTypeEnum("user_type").notNull(),
  notification_type: notificationTypeEnum("notification_type")
    .default("info")
    .notNull(),

  message: text("message").notNull(),
  is_read: boolean("is_read").default(false).notNull(),

  // Audit (Who created the notification? Usually the system or an admin)
  created_by: integer("created_by").references(() => users.id, {
    onDelete: "set null",
  }),

  created_at: timestamp("created_at").defaultNow().notNull(),
});
