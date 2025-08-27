import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_username', // replace with your PostgreSQL username
  host: 'localhost',
  database: 'your_database', // replace with your database name
  password: 'your_password', // replace with your PostgreSQL password
  port: 5432, // default PostgreSQL port
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export { pool, connectDB };