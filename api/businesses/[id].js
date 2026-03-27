import { sql, json } from '../_db.js';

export default async function handler(req, res) {
  const { id } = req.query;

  // GET /api/businesses/:id — fetch full business with users
  if (req.method === 'GET') {
    try {
      const rows = await sql`SELECT * FROM businesses WHERE id = ${id}`;
      if (!rows.length) return json(res, 404, { error: 'Not found' });

      const biz = rows[0];
      const users = await sql`
        SELECT id, name, email, username, role
        FROM users WHERE business_id = ${id}
      `;

      return json(res, 200, {
        id: biz.id,
        company: biz.company,
        industry: biz.industry,
        color: biz.color,
        users,
        ...(biz.data || {}),
      });
    } catch (err) {
      console.error(err);
      return json(res, 500, { error: 'Server error' });
    }
  }

  // PUT /api/businesses/:id — sync full data blob
  if (req.method === 'PUT') {
    const { company, industry, color, data } = req.body;
    try {
      await sql`
        UPDATE businesses
        SET company  = COALESCE(${company}, company),
            industry = COALESCE(${industry}, industry),
            color    = COALESCE(${color}, color),
            data     = ${JSON.stringify(data)}
        WHERE id = ${id}
      `;
      return json(res, 200, { ok: true });
    } catch (err) {
      console.error(err);
      return json(res, 500, { error: 'Server error' });
    }
  }

  return json(res, 405, { error: 'Method not allowed' });
}
