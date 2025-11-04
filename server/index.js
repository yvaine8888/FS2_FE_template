require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Using mysql2 + dotenv
// TODO: Configure this pool with your schema credentials from Lesson 9.
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD, // Remove fallback for security
  database: process.env.DB_NAME || 'e-commerce',
});


app.post('/submit-form', (req, res) => {
  // Pull the values that were sent from the React contact form.
  const { firstname, lastname, email, subject } = req.body;

  // Guard clause to help students debug missing form fields quickly.
  if (!firstname || !lastname || !email || !subject) {
    return res.status(400).json({
      message: 'Please fill out the entire form before submitting.',
    });
  }

  // Insert the form submission into the "contact" table built in MySQL Workbench.
  const sqlInsert =
    'INSERT INTO contact (firstname, lastname, email, subject) VALUES (?, ?, ?, ?)';

  db.query(sqlInsert, [firstname, lastname, email, subject], (err) => {
    if (err) {
      console.error('Failed to save contact form submission:', err);
      return res.status(500).json({
        message: 'Something went wrong while saving your message. Please try again.',
      });
    }

    // Let the front end know that the insert was successful.
    res.status(201).json({ message: 'Thank you! Your message has been sent.' });
  });
});


// Optional: quick health check
app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/api/ecommerce/products', (req, res) => {
  const searchTerm = req.query.search || '';
  const sql = `SELECT * FROM products WHERE name LIKE ?`;
  const values = [`%${searchTerm}%`];

  db.query(sql, values, (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.json(rows);
  });
});

// Get current cart items from DB
app.get('/api/ecommerce/cart', (req, res) => {
  const sql = 'SELECT * FROM cart ORDER BY id DESC'; // no created_at assumption
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching cart:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(rows);
  });
});


app.post('/api/ecommerce/cart', (req, res) => {
  const { product } = req.body;

  if (!product) {
    return res.status(400).json({ message: 'Product data is required.' });
  }

  const sql = 'INSERT INTO cart (id, name, description, image_url, price) VALUES (?, ?, ?, ?, ?)';
  const values = [
    product.id,
    product.name,
    product.description,
    product.image_url,
    product.price,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding product to cart:', err);
      return res.status(500).send('Server error');
    }

    res.json(result);
  });
});

app.delete('/api/ecommerce/buy', (req, res) => {

  const sql = 'DELETE FROM cart';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error removing products from cart:', err);
      return res.status(500).send('Server error');
    }
    res.json(result);
  });
});

app.delete('/api/ecommerce/cart/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM cart WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error removing product from cart:', err);
      return res.status(500).send('Server error');
    }

    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
