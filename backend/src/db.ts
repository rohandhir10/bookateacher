// bookateacher backend — PostgreSQL connection + queries
import pg from "pg";

const { Pool } = pg;

let _pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!_pool) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is required");
    }
    _pool = new Pool({ connectionString: databaseUrl });
    _pool.on("error", (err: Error) => {
      console.error("Unexpected database pool error:", err);
    });
  }
  return _pool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const pool = getPool();
  const result = await pool.query(text, params);
  return result.rows as T[];
}

export async function queryOne<T = any>(text: string, params?: any[]): Promise<T | undefined> {
  const rows = await query(text, params);
  return rows.length > 0 ? (rows[0] as T) : undefined;
}

export async function execute(text: string, params?: any[]): Promise<void> {
  const pool = getPool();
  await pool.query(text, params);
}

export async function transaction<T>(fn: (client: pg.PoolClient) => Promise<T>): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

/** Generate a unique ID (same format as frontend) */
export function uid(): string {
  return crypto.randomUUID();
}
