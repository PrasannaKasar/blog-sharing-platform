const express = require('express');
const pool = require('../db');  // Import the pool from db.js
const { authenticate } = require('../middleware/authenticate');
const { summarizeTextWithGemini } = require('../models/summarizer')
const router = express.Router();

// Route to fetch all blogs with optional search and sorting
router.get('/', authenticate, async (req, res) => {
  const { search, sortBy } = req.query;  // Extract query parameters

  // Build the query dynamically based on filters
  let query = 'SELECT * FROM blogs ORDER BY created_at DESC';  // Default to newest blogs first
  const params = [];

  // If search is provided, filter by user’s name
  if (search) {
    query = 'SELECT * FROM blogs WHERE title ILIKE $1 ORDER BY created_at DESC';
    params.push(`%${search}%`);
  }

  // If sorting is provided, handle sorting
  if (sortBy === 'oldest') {
    query = 'SELECT * FROM blogs ORDER BY created_at ASC';
  } else if (sortBy === 'most_upvoted') {
    query = 'SELECT * FROM blogs ORDER BY upvotes DESC';
  }

  try {
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);  // Return the blogs in JSON format
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// Route to fetch a single blog post by its ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching blog:', err);
    res.status(500).json({ message: 'Error fetching blog' });
  }
});

// Route to create a new blog post
router.post('/', authenticate, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, content]
    );

    const newBlog = result.rows[0];
    res.status(201).json(newBlog);  // Return the new blog post
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ message: 'Error creating blog' });
  }
});

router.post('/summarize', authenticate, async (req, res) => {
  const { content } = req.body;  // Content to summarize

  try {
    // Call summarizeTextWithGemini to summarize the blog content
    const summary = await summarizeTextWithGemini(content);
    
    // Send the summary as the response
    res.status(200).json({ summary });
  } catch (err) {
    console.error('Error summarizing blog:', err);
    res.status(500).json({ message: 'Error summarizing blog' });
  }
});

module.exports = router;
