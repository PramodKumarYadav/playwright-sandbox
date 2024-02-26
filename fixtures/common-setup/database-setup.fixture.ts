import { test as base } from "@playwright/test";
import { Database } from "../../database/database"; // Import your Database class

// export const test = base.extend<{ db: Database }>({
//   db: async ({}, use) => {
//     const db = new Database(10); // Create a database pool with 10 connections
//     await db.connect();

//     // Pass the connected database to the tests
//     await use(db);

//     // Close the database connection after the test
//     await db.close();
//   },
// });

// In traditional setup, we would end up creating a pool for each test. We dont want that.
// Thus we create a single pool and pass it to all the tests.
const db = new Database(10); // Create a database pool with 10 connections

export const test = base.extend<{ db: Database }>({
  db: async ({}, use) => {
    // Pass the connected database to the tests
    await use(db);
  },
});

test.beforeAll(async () => {
  console.log("connect to database");
  await db.connect();
});

test.afterAll(async () => {
  console.log("close database connection");
  await db.close();
});
