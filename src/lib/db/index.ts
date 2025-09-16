import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Lazy-loaded database connection
let client: any;
let db: any;

function getDb() {
  if (db) return db;
  
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    return null;
  }

  // Create the connection
  client = postgres(connectionString, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  // Create the Drizzle database instance
  db = drizzle(client, { schema });
  return db;
}

// Export the lazy-loaded database function
export { getDb as db };

// Export a direct database instance getter for convenience
export const database = () => {
  const instance = getDb();
  if (!instance) {
    throw new Error("Database not available - check DATABASE_URL environment variable");
  }
  return instance;
};

// Export all schema types and functions
export * from "./schema";

// Utility function to close the database connection
export const closeDb = async () => {
  if (client) {
    await client.end();
  }
};

// Type for the database instance
export type Database = typeof db;
