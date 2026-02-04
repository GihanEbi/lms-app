import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").default("student"),
  createdAt: timestamp("created_at").defaultNow(),
});
