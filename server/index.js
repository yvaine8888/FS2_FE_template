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
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'e-commerce',
});

// TODO: Implement /submit-form to handle form data and insert into your database
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, subject } = req.body;
  const sqlInsert = "INSERT INTO contact_form VALUES (NULL, ?, ?, ?, ?)";

  if (!firstName || !lastName || !email || !subject)
  {
    return res.status(400).json({
      message: 'Please fill out the entire form before submitting.'
    })
  }
  db.query(sqlInsert, [firstName, lastName, email, subject], (err, result) => {
    console.log(err);
  })
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
