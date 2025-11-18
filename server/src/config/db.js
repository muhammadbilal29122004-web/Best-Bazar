import pkg from 'pg';

const { Pool } = pkg;

const isDbConfigured = Boolean(process.env.DATABASE_URL);
let pool = null;

if (isDbConfigured) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
  });

  pool.on('error', (error) => {
    console.error('Unexpected Postgres error', error);
  });
}

export const db = {
  enabled: isDbConfigured,
  async query(text, params) {
    if (!pool) {
      throw new Error('Database is not configured. Set DATABASE_URL to enable Postgres.');
    }
    return pool.query(text, params);
  }
};

export default pool;

