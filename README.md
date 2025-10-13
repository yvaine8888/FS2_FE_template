# Full Stack Lesson Template

This repository now includes a simple Express backend to support Lesson 9 form submissions.

## Project Structure

- `client/` – React front-end created with Create React App.
- `server/` – Express API server scaffolded for the MySQL lesson.

## Server Setup

1. `cd server`
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and update the MySQL credentials for your schema.
4. Start the development server.

### Available Server Scripts

- `npm run dev` – Runs the server with nodemon for automatic reloads.
- `npm start` – Runs the server with Node.

The Express app listens on port `3001` and already includes middleware for CORS, JSON parsing, and URL-encoded form bodies. Follow the TODOs in `server/index.js` to finish the MySQL connection pool and the `/submit-form` route logic from Lesson 9.
