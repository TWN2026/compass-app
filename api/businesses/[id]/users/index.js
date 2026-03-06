import { sql, json } from '../../../_db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { id } = req.query;

  // POST /api/businesses/:id/users — add a user
  if (req.method === 'POST') {
    const { id: uid, name, email, username, password, role } = req.body;
    if (!uid || !name || !username) return json(res, 400, { error: 'Missing fields' });

    try {
      const hash = await bcrypt.hash(password || 'changeme', 10);
      await sql`
        INSERT INTO users (id, business_id, name, email, username, password, role)
        VALUES (${uid}, ${id}, ${name}, ${email || ''}, ${username}, ${hash}, ${role || 'member'})
      `;
      return json(res, 201, { ok: true });
    } catch (err) {
      console.error(err);
      return json(res, 500, { error: 'Server error' });
    }
  }

  return json(res, 405, { error: 'Method not allowed' });
}
