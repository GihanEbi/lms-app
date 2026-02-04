import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// This grabs your secret URL from the .env file
const connectionString = process.env.DATABASE_URL!;

// This creates the actual connection driver
const client = postgres(connectionString);

// This creates the "db" variable we will use in the rest of the app
// We pass in the "schema" so Drizzle knows about your tables!
export const db = drizzle(client, { schema });
