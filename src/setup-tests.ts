import { beforeAll, beforeEach, afterAll } from "vitest";
import { db } from "@/db";
import { migrate } from "drizzle-orm/postgres-js/migrator"; // Or your specific driver
import { sql } from "drizzle-orm";

// 1. Run Migrations once before any tests start
beforeAll(async () => {
  // Make sure your 'drizzle' folder contains your migration files!
  await migrate(db, { migrationsFolder: "drizzle" });
});

// 2. Clear the database before EVERY test
beforeEach(async () => {
  // This clears all tables in the 'public' schema
  // We use "CASCADE" to delete related data (like posts belonging to a user)
  await db.execute(sql`
    DO $$ DECLARE
        r RECORD;
    BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
            EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;
    END $$;
  `);
});

// 3. Close connection after all tests are done
afterAll(async () => {
  // proper cleanup if your driver supports it, e.g. await client.end()
  // For Drizzle with some drivers, you might not strictly need this, 
  // but it's good practice.
});