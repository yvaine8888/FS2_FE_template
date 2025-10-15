# Lesson 10: Product Database

Welcome to the template repository for Lesson 10. In this lesson you will stand up a simple ecommerce catalog by creating a `products` table in MySQL, exposing the rows through the Express API, and rendering the results inside the React frontend.

**Lesson objectives:**
- Design the `products` schema and load sample inventory data into MySQL.
- Verify the Express server can read from MySQL and serve `GET /api/ecommerce/products`.
- Update the React UI to request and display the catalog data returned by the backend.

## Folder Layout
- **`client/`** – React frontend that renders the product catalog and interacts with the API.
- **`server/`** – Node/Express backend that exposes routes such as `GET /api/ecommerce/products` and communicates with the database.
- **`docs/CRA_REFERENCE.md`** – Archived Create React App reference documentation from the original scaffold.

> If you are missing the `server/` folder locally, create it with the lesson starter code or pull the latest changes from your instructor's branch.

---

## Getting Started in VS Code

1. Open **VS Code**.
2. Press **Ctrl + Shift + P** (or **Cmd + Shift + P** on Mac).
3. Choose **Git: Clone**.
4. Paste your repository URL and choose a local folder.
5. Once the project opens, click **“Open in new window”** if prompted.

---

## Prerequisites

Make sure you have these installed before starting:
- **Node.js 18 LTS or newer** (includes `npm`)
- **MySQL Server** (for your local database)
- **MySQL Workbench** *(optional)* – to manage your schema and tables visually

---

## Install & Run

Before launching either app, confirm the `products` table exists and contains data (see [Products Table SQL & Sample Data](#products-table-sql--sample-data)). The React frontend now depends on the backend route `GET /api/ecommerce/products` to populate the catalog view.

### Step 1: Start the Server
```bash
cd server
npm install
# Ensure mysql2 is installed for database connectivity
npm install mysql2
npm run dev
```
This runs the Express server with `nodemon` on **http://localhost:3001**.

### Step 2: Start the Client
```bash
cd client
npm install
npm start
```
This launches the React app on **http://localhost:3000**. Once the products data is seeded, keep both the client and server running so the UI can load `/api/ecommerce/products` successfully.

---

## Environment Variables

This project already uses `.env` files directly — no `.env.example` required.

### In `server/.env`
Update this file to match your local MySQL setup:
```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce
PORT=3001
```

### In `client/.env`
Make sure your frontend knows where to find your backend:
```env
REACT_APP_API_BASE_URL=http://localhost:3001
```

---

## Lesson 10 TODOs

You’ll complete these steps throughout the lesson. They mirror the sections outlined in your curriculum.

| Lesson Section | Goal |
|-----------------|------|
| **1.1 / 1.2** | Confirm folder structure, seed the products data, and keep both the client and server running. |
| **2.2** | Create a MySQL database and a `products` table (either through the UI or using SQL). |
| **2.3** | Connect the backend to the database and expose a `/api/ecommerce/products` GET route. |
| **2.4** | Render the product catalog in React using the data returned from the API. |

---

## Section 2.2 – Create the Database and Table

You may have already created this during setup. If not, here’s how:

### Option 1 – MySQL Workbench (UI)
1. Open MySQL Workbench.
2. Create a new schema named **`ecommerce`**.
3. In that schema, create a table named **`products`** with the following columns:
   - id (INT, AUTO_INCREMENT, PRIMARY KEY)
   - name (VARCHAR(150), NOT NULL)
   - description (TEXT, NULL)
   - price (DECIMAL(10,2), NOT NULL)
   - sku (VARCHAR(50), NOT NULL)
   - image_url (VARCHAR(255), NULL)
   - created_at (TIMESTAMP, defaults to CURRENT_TIMESTAMP)

### Option 2 – Run SQL Commands
If you prefer, use this SQL to create everything manually:
```sql
CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sku VARCHAR(50) NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Products Table SQL & Sample Data

Paste the block below into MySQL Workbench or the MySQL CLI to create the table and seed it with starter rows you can query immediately:

```sql
USE ecommerce;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sku VARCHAR(50) NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, sku, image_url) VALUES
  ('Wireless Headphones', 'Noise-cancelling over-ear headphones with 30 hours of battery life.', 99.99, 'WH-001', 'https://picsum.photos/id/180/600/400'),
  ('Smart Watch', 'Water-resistant watch with heart-rate monitoring and GPS tracking.', 149.50, 'SW-201', 'https://picsum.photos/id/1050/600/400'),
  ('Travel Backpack', '35L backpack with laptop sleeve and weather-resistant fabric.', 84.00, 'TB-410', 'https://picsum.photos/id/1011/600/400'),
  ('Ceramic Mug', '12oz handcrafted mug that is microwave and dishwasher safe.', 18.75, 'CM-009', 'https://picsum.photos/id/443/600/400'),
  ('Bluetooth Speaker', 'Portable speaker with rich bass and 10 hours of play time.', 59.99, 'BS-550', 'https://picsum.photos/id/1080/600/400');
```

---

## Section 2.3 – Connect to the Database and Add the Products Route

Open **`server/index.js`** and confirm it connects to MySQL with `mysql2` and exposes a GET endpoint that reads from the `products` table:

```js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // ✅ use mysql2

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ✅ Connect to your MySQL database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ Read products for the frontend catalog
app.get('/api/ecommerce/products', (req, res) => {
  const sql = `
    SELECT id, name, description, price, sku, image_url
    FROM products
    ORDER BY name ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('DB query error:', err);
      return res.status(500).json({ message: 'Unable to load products.' });
    }

    return res.status(200).json(results);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
```

---

## Section 2.4 – Connect the React Catalog View

Open **`client/src`** and locate the component or page that renders the product list (for example, `pages/products.jsx`). Add a hook that requests the products endpoint when the component mounts and stores the response in state:

```jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/products`)
      .then(({ data }) => {
        setProducts(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') {
    return <p>Loading products…</p>;
  }

  if (status === 'error') {
    return <p>We could not load the catalog. Try refreshing once the server is running.</p>;
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <article key={product.id} className="product-card">
          {product.image_url && (
            <img src={product.image_url} alt={product.name} />
          )}
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <small>SKU: {product.sku}</small>
        </article>
      ))}
    </section>
  );
};
```

Then:
1. Start both apps (`npm run dev` in `server`, `npm start` in `client`) after seeding the database.
2. Visit your product catalog page to confirm the list renders.
3. Check MySQL → `ecommerce.products` to verify the API is returning the rows you expect.

---

## Lesson 10 Alignment

| Lesson Section | Description |
|----------------|--------------|
| **Lesson 10: Product Database Kickoff / Do Now** | Locate your FS1 project or use this template. |
| **Section 1.1: File Setup** | Set up `client` and `server` folders. |
| **Section 1.2: Moving Files** | Seed the products table and verify both apps run. |
| **Section 2.1: Features that Need a Database** | Identify catalog features that read product data. |
| **Section 2.2: Product Table** | Create and populate the `products` table in MySQL. |
| **Section 2.3: Connect the Database** | Implement the backend `GET /api/ecommerce/products` route with `mysql2`. |
| **Section 2.4: Rendering Data** | Fetch the products in React and render the catalog UI. |

---

## Verification Steps

✅ `npm run dev` in `server` → runs on port 3001
✅ `npm start` in `client` → loads on port 3000
✅ `GET /api/ecommerce/products` → returns seeded rows in Postman or the browser
✅ Catalog page renders products from the API response

---

## Additional Resources
- [`docs/CRA_REFERENCE.md`](docs/CRA_REFERENCE.md) – Original Create React App documentation
- Check your LMS or instructor notes for any lesson-specific MySQL credentials or example screenshots.
