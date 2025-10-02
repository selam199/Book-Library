# 📚 Book Library
A simple Book Library application built with **React** and **Tailwind CSS**. The app allows users to search for books and view details using the **Open Library API**.
---
## 🚀 Quick Setup (Vite + Tailwind)
1. Create a new Vite + React project:
```bash
npm create vite@latest book-library -- --template react
cd book-library
```
2. Install dependencies:

```bash
npm install
```
3. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
4. Configure Tailwind:
   Edit **`tailwind.config.cjs`** and set:
```js
content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
```
5. Add Tailwind to CSS:
   In **`src/index.css`**, add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
6. Replace the app component:
   Place your Book Library component as **`src/App.jsx`**. Ensure **`src/main.jsx`** imports:

```
7. Run the project:

```bash
npm run dev
```
---

## 📖 Features

* 🔍 Search for books by title, author, or keyword
* 📑 View detailed book information (cover, description, publisher, subjects, etc.)
* 📱 Responsive UI with Tailwind CSS
* ⚡ Fast dev environment using Vite

---

## 🛠 Tech Stack

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Open Library API](https://openlibrary.org/developers/api)

---

## 📌 Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

* `feat:` → Add a new feature
* `fix:` → Fix a bug
* `chore:` → Setup/config changes (no user-facing effect)
* `docs:` → Documentation updates

---

## 📜 License

MIT License.
