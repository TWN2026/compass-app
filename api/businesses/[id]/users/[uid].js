import { sql, json } from '../../../_db.js';

export default async function handler(req, res) {
  const { id, uid } = req.query;

  // DELETE /api/businesses/:id/users/:uid — remove a user
  if (req.method === 'DELETE') {
    try {
      await sql`DELETE FROM users WHERE id = ${uid} AND business_id = ${id}`;
      return json(res, 200, { ok: true });
    } catch (err) {
      console.error(err);
      return json(res, 500, { error: 'Server error' });
    }
  }

  return json(res, 405, { error: 'Method not allowed' });
}
