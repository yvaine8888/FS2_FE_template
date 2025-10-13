# Full-Stack Lesson 9 Starter Guide

Welcome to the template repository for Lesson 9. This guide replaces the default Create React App boilerplate and highlights exactly where to work when continuing the lesson.

## Folder Layout
- **`client/`** – React frontend that renders the contact form and interacts with the API.
- **`server/`** – Node/Express backend that exposes routes such as `POST /submit-form` and communicates with the database.
- **`docs/CRA_REFERENCE.md`** – Archived Create React App reference documentation from the original scaffold.

> If you are missing the `server/` folder locally, create it with the lesson starter code or pull the latest changes from your instructor's branch.

## Opening in GitHub Codespaces
1. Visit the repository on GitHub and click **Code** ▸ **Codespaces** ▸ **Create codespace on main**.
2. Codespaces provisions the development container with Node.js, npm, and MySQL client tools pre-installed for you.
3. After the workspace boots, open two terminals (one for `client/`, one for `server/`) so you can run both apps concurrently.

## Local Setup (outside Codespaces)
### Prerequisites
- **Node.js 18 LTS or newer** – install from [nodejs.org](https://nodejs.org/en/download) or use a version manager such as `nvm`.
- **npm** – bundled with Node.js (verify with `npm --version`).
- **MySQL Server & MySQL Workbench** – download from [dev.mysql.com/downloads/workbench](https://dev.mysql.com/downloads/workbench/) to design the schema and inspect data.

### Install Dependencies and Run Apps
Run the following commands in the indicated folders:

#### `client/`
```bash
cd client
npm install
npm start
```
- `npm start` launches the React development server on port 3000.
- Use `npm test` or `npm run build` as needed for lesson extensions.

#### `server/`
```bash
cd server
npm install
npm run dev
```
- `npm run dev` should start your Express server with hot reloading (configure with `nodemon` or a similar tool).
- Use `npm start` for the production build once the API is complete.

## Environment Variables
Create a `.env` file in the `server/` directory to store secrets such as:
```env
DATABASE_URL=mysql://user:password@localhost:3306/lesson9
PORT=4000
```
- Never commit `.env` files; ensure they are listed in `.gitignore`.
- If the React app needs public environment variables, add them to `client/.env` with the `REACT_APP_` prefix (for example, `REACT_APP_API_BASE_URL=http://localhost:4000`).

## Lesson 9 TODOs
Track your progress with the checklist that mirrors the lesson agenda:
- [ ] Set up the MySQL database schema (tables, relations, seed data) in Workbench or migration files.
- [ ] Configure environment variables and database connection utilities in the `server/`.
- [ ] Implement the `POST /submit-form` route to validate requests and persist submissions.
- [ ] Connect the React contact form to call the API and handle loading/success/error states.
- [ ] Display submitted data or confirmation messages in the UI.
- [ ] Add any stretch goals from the lesson (e.g., input validation helpers, server-side logging).

## Additional Resources
- Refer to [`docs/CRA_REFERENCE.md`](docs/CRA_REFERENCE.md) if you need the original Create React App documentation.
- Check your LMS or instructor notes for lesson-specific database credentials or deployment targets.
