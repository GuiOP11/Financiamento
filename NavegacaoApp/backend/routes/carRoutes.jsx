import express from 'express';
import { Pool } from 'pg';

const router = express.Router();
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Route to register a new car
router.post('/register', async (req, res) => {
  const { model, brand, year } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO cars (model, brand, year) VALUES ($1, $2, $3) RETURNING *',
      [model, brand, year]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all cars
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;