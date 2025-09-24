// models/blogs.js

const pool = require('../db');  // Import the database connection

// Function to create a new blog
const createBlog = async (userId, title, content) => {
  const query = 'INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *';
  const values = [userId, title, content];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];  // Return the created blog post
  } catch (err) {
    console.error('Error creating blog:', err);
    throw new Error('Could not create blog');
  }
};

// Function to fetch all blogs
const getBlogs = async () => {
  const query = `
    SELECT blogs.*, users.email, blogs.created_at
    FROM blogs 
    JOIN users ON blogs.user_id = users.id
    ORDER BY blogs.created_at DESC
  `;

  try {
    const result = await pool.query(query);
    return result.rows;  // Return all blogs with associated user email and creation date
  } catch (err) {
    console.error('Error fetching blogs:', err);
    throw new Error('Could not fetch blogs');
  }
};

// Function to fetch a blog by its ID
const getBlogById = async (id) => {
  const query = `
    SELECT blogs.*, users.email, blogs.created_at
    FROM blogs 
    JOIN users ON blogs.user_id = users.id
    WHERE blogs.id = $1
  `;

  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Return the specific blog post
  } catch (err) {
    console.error('Error fetching blog:', err);
    throw new Error('Could not fetch blog');
  }
};

module.exports = { createBlog, getBlogs, getBlogById };
