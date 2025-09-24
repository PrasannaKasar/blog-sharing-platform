const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// JWT secret from .env file
const JWT_SECRET = process.env.JWT_SECRET;

const pool = require('./db.js');

// Test Postgres connection instead of holding a client forever
pool.query('SELECT NOW()')
  .then(res => console.log("Connected to Postgres at:", res.rows[0].now))
  .catch(err => console.error("Postgres connection error", err));

const app = express();
const port = 5000;

// Middleware
app.use(cors());            // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// --- AUTH ROUTES ---

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error in /login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error('Error in /register:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify Token
app.get('/verify-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const userId = decoded.userId;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    res.status(200).json({ user });
  });
});

// --- BLOG ROUTES (secured) ---
const blogRoutes = require('./routes/blogs');
app.use('/blogs', blogRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});