import { Pool } from "pg";

export class Database {
  private pool: Pool;

  constructor(maxConnections: number) {
    this.pool = new Pool({
      user: "dbuser",
      host: "database.server.com",
      database: "mydb",
      password: "secretpassword",
      port: 5432,
      max: maxConnections, // Set the maximum number of connections
    });
  }

  async connect() {
    // await this.pool.connect();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async query(sql: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      return await client.query(sql, params);
    } finally {
      client.release();
    }
  }

  async close() {
    // await this.pool.end();
  }
}
