import {
  pgTable,
  serial,
  varchar,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 255 }), // Who made the change?
  action: varchar("action", { length: 50 }).notNull(), // CREATE, UPDATE, DELETE
  table_name: varchar("table_name", { length: 50 }).notNull(), // e.g., "courses"
  record_id: integer("record_id").notNull(), // The ID of the row being changed
  old_values: jsonb("old_values"), // Snapshot BEFORE change
  new_values: jsonb("new_values"), // Snapshot AFTER change
  created_at: timestamp("created_at").defaultNow().notNull(),
});
