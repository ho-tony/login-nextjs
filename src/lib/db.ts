import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async (text: string, params: any[] = []) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  }
};
