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
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// TODO: Implement /submit-form to handle form data and insert into your database
app.post('/submit-form', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// Optional: quick health check
app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/api/ecommerce/products', (req, res) => {
  const sql = 'SELECT * FROM products';

  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.json(rows);
  });
});

app.post('/api/ecommerce/cart', (req, res) => {
  const { product } = req.body;

  if (!product) {
    return res.status(400).json({ message: 'Product data is required.' });
  }

  const sql =
    'INSERT INTO cart (id, name, description, image_url, price) VALUES (?, ?, ?, ?, ?)';
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
