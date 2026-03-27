import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);

export function json(res, status, data) {
  res.status(status).json(data);
}
