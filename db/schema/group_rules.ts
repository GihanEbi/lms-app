import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { userGroups, rules } from "@/db/schema";

export const groupRules = pgTable(
  "group_rules",
  {
    // Link to the Group
    group_id: integer("group_id")
      .notNull()
      .references(() => userGroups.id, { onDelete: "cascade" }),

    // Link to the Rule
    rule_id: integer("rule_id")
      .notNull()
      .references(() => rules.id, { onDelete: "cascade" }),
  },
  (t) => ({
    // Create a Composite Primary Key
    // This ensures you can't link the same rule to the same group twice
    pk: primaryKey({ columns: [t.group_id, t.rule_id] }),
  }),
);
