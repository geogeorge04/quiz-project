const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Initialize the users and scores tables if they don't exist
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      contact TEXT NOT NULL,
      timestamp TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS scores (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      contact TEXT NOT NULL,
      total_score INTEGER NOT NULL,
      category_scores JSONB NOT NULL,
      timestamp TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log('Users and scores tables ready!');
}

// Add a new user
async function addUser({ name, email, contact }) {
  const result = await pool.query(
    'INSERT INTO users (name, email, contact) VALUES ($1, $2, $3) RETURNING *',
    [name, email, contact]
  );
  return result.rows[0];
}

// Get all users
async function getUsers() {
  const result = await pool.query('SELECT * FROM users ORDER BY timestamp DESC');
  return result.rows;
}

// Add a new score
async function addScore({ user_id, name, email, contact, total_score, category_scores }) {
  // First get user details if not provided
  if (!email || !contact) {
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      email = user.email;
      contact = user.contact;
    }
  }

  const result = await pool.query(
    'INSERT INTO scores (user_id, name, email, contact, total_score, category_scores) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [user_id, name, email, contact, total_score, category_scores]
  );
  return result.rows[0];
}

// Get all scores
async function getScores() {
  const result = await pool.query(`
    SELECT s.*, u.name, u.email, u.contact
    FROM scores s
    LEFT JOIN users u ON s.user_id = u.id
    ORDER BY s.timestamp DESC
  `);
  return result.rows;
}

// Get all users with their scores
async function getUsersWithScores() {
  const result = await pool.query(`
    SELECT 
      u.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', s.id,
            'total_score', s.total_score,
            'category_scores', s.category_scores,
            'timestamp', s.timestamp
          )
          ORDER BY s.timestamp DESC
        ) FILTER (WHERE s.id IS NOT NULL),
        '[]'
      ) as scores
    FROM users u
    LEFT JOIN scores s ON s.user_id = u.id
    GROUP BY u.id
    ORDER BY u.timestamp DESC
  `);
  return result.rows;
}

module.exports = { pool, initDb, addUser, getUsers, addScore, getScores, getUsersWithScores }; 