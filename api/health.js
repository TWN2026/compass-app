import { sql, json } from './_db.js';

export default async function handler(req, res) {
  try {
    const rows = await sql`SELECT COUNT(*) as businesses FROM businesses`;
    const users = await sql`SELECT COUNT(*) as users FROM users`;
    return json(res, 200, {
      ok: true,
      db: process.env.DATABASE_URL ? 'env set' : 'env MISSING',
      businesses: rows[0].businesses,
      users: users[0].users,
    });
  } catch (err) {
    return json(res, 500, { ok: false, error: err.message });
  }
}
