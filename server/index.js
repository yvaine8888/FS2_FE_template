const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a small pool of reusable connections to the MySQL database that was
// created in Lesson 9. Environment variables allow instructors/students to
// override the defaults without touching the code.
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce',
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
    'INSERT INTO contact (First_name, Last_name, Email, message) VALUES (?, ?, ?, ?)';

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
