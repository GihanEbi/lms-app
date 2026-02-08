// src/lib/audit.ts (Update this file)
import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { eq, getTableName } from "drizzle-orm";

type AuditAction = "CREATE" | "UPDATE" | "DELETE";

export async function withAudit(
  userId: string | number,
  action: AuditAction,
  table: any,
  recordId: number | null, // 👈 Changed: Allow null/0 for creates
  operation: () => Promise<any>,
) {
  let oldValues = null;

  // 1. Snapshot Old Values (Only if we have an ID)
  if ((action === "UPDATE" || action === "DELETE") && recordId) {
    const rows = await db.select().from(table).where(eq(table.id, recordId));
    if (rows.length > 0) oldValues = rows[0];
  }

  // 2. Perform Operation
  const result = await operation();
  const data = Array.isArray(result) ? result[0] : result;

  // 3. Resolve the Record ID
  // If we didn't know the ID before (CREATE), grab it from the result now
  const finalRecordId = recordId ?? data?.id;

  // 4. Log it
  if (finalRecordId) {
    await db.insert(auditLogs).values({
      user_id: String(userId),
      action: action,
      table_name: getTableName(table),
      record_id: finalRecordId,
      old_values: oldValues,
      new_values: action === "DELETE" ? null : data,
    });
  }

  return result;
}
