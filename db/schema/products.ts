import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  // serial is an auto-incrementing integer
  id: serial("id").primaryKey(),

  // text is a standard string column
  name: text("name").notNull(),

  // integer is good for price (storing value in cents avoids decimal errors!)
  price: integer("price").notNull(),
});
