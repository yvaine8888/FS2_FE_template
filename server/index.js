const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Configure mysql.createPool with your schema credentials from Lesson 9.
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post('/submit-form', (req, res) => {
  // TODO: Finish the Lesson 9 /submit-form implementation using your database pool.
  res.status(501).json({ message: 'Not implemented yet' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
