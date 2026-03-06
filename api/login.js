import { sql, json } from './_db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const body = req.body || {};
  const { username, password } = body;
  if (!username || !password) return json(res, 400, { error: 'Missing credentials' });

  try {
    const rows = await sql`
      SELECT u.*, b.company, b.industry, b.color, b.data as biz_data
      FROM users u
      LEFT JOIN businesses b ON u.business_id = b.id
      WHERE u.username = ${username}
    `;

    if (!rows.length) return json(res, 401, { error: 'Invalid username or password' });

    const row = rows[0];
    // Support bcrypt hashes (new users) and plaintext (seeded demo users)
    const valid = row.password.startsWith('$2')
      ? await bcrypt.compare(password, row.password)
      : password === row.password;
    if (!valid) return json(res, 401, { error: 'Invalid username or password' });

    const user = {
      id: row.id,
      name: row.name,
      email: row.email,
      username: row.username,
      role: row.role,
      bizId: row.business_id || null,
    };

    if (row.role === 'coach') {
      return json(res, 200, { user });
    }

    // For owner/member: return their full business data
    const userRows = await sql`
      SELECT id, name, email, username, role
      FROM users WHERE business_id = ${row.business_id}
    `;

    const business = {
      id: row.business_id,
      company: row.company,
      industry: row.industry,
      color: row.color,
      users: userRows,
      ...(row.biz_data || {}),
    };

    return json(res, 200, { user, business });
  } catch (err) {
    console.error('login error', err);
    return json(res, 500, { error: 'Server error', detail: err.message });
  }
}
