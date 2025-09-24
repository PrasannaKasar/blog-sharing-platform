const { Pool } = require('pg');  // ✅ Import Pool from pg

// Set up the Postgres connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp2',
  password: '1969',   // ⚠️ Move this to an environment variable in production
  port: 5432,
});

module.exports = pool;