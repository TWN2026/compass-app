import { sql, json } from '../_db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  // GET /api/businesses — coach: list all businesses
  if (req.method === 'GET') {
    try {
      const rows = await sql`
        SELECT b.id, b.company, b.industry, b.color,
               COUNT(u.id)::int AS user_count
        FROM businesses b
        LEFT JOIN users u ON u.business_id = b.id
        GROUP BY b.id
        ORDER BY b.company
      `;
      return json(res, 200, rows);
    } catch (err) {
      console.error(err);
      return json(res, 500, { error: 'Server error' });
    }
  }

  // POST /api/businesses — coach: create new business + users
  if (req.method === 'POST') {
    const { id, company, industry, color, users } = req.body;
    if (!id || !company) return json(res, 400, { error: 'Missing required fields' });

    const emptyData = {
      plan: {
        coreValues: [], purpose: '', niche: '',
        bhag: { goal: '', date: '', narrative: '' },
        threeYear: { date: '', revenue: '', profit: '', measurables: [], possibilities: [] },
        oneYear: { date: '', revenue: '', profit: '', measurables: [], goals: [] },
        quarterly: { date: '', revenue: '', profit: '', measurables: [], goal: '' },
        longTermIssues: [],
      },
      orgChart: { seats: [] },
      rocks: [], scorecard: [], issues: [], todos: [],
      headlines: [], meetingNotes: [], rprs: [], oneOnOnes: [], notifications: [],
    };

    try {
      await sql`
        INSERT INTO businesses (id, company, industry, color, data)
        VALUES (${id}, ${company}, ${industry || ''}, ${color || '#7a9e7e'}, ${JSON.stringify(emptyData)})
      `;

      for (const u of (users || [])) {
        const hash = await bcrypt.hash(u.password || 'changeme', 10);
        await sql`
          INSERT INTO users (id, business_id, name, email, username, password, role)
          VALUES (${u.id}, ${id}, ${u.name}, ${u.email || ''}, ${u.username}, ${hash}, ${u.role})
        `;
      }

      return json(res, 201, { id, company, industry, color, users, ...emptyData });
    } catch (err) {
      console.error(err);
      return json(res, 500, { error: 'Server error' });
    }
  }

  return json(res, 405, { error: 'Method not allowed' });
}
