# 📚 Book Library

A simple **Book Library** application built with **React** and **Tailwind CSS**. Users can search for books and view detailed information using the **Open Library API**.

---

## 🚀 Quick Setup (Vite + Tailwind)

1. **Create a new Vite + React project**:
   ```bash
   npm create vite@latest book-library -- --template react
   cd book-library
````
2. **Install dependencies**:

   ```bash
   npm install
   ```
3. **Install Tailwind CSS**:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
4. **Configure Tailwind**
   Edit `tailwind.config.cjs`:
   ```js
   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
   ```
5. **Add Tailwind to CSS**
   In `src/index.css`, add:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
6. **Replace the App component**
   Place your Book Library component in `src/App.jsx` and ensure `src/main.jsx` imports it.
7. **Start the development server**:
   ```bash
   npm run dev
   ```
---
## 📂 Project Structure

BOOK-LIBRARY/
 ├── node_modules/
 ├── public/
 ├── src/
 │   ├── assets/                  # Static assets (images, icons, etc.)
 │   ├── components/
 │   │   ├── BookCard.jsx          # Displays book cover, title, and author
 │   │   ├── BookDetails.jsx       # Shows detailed info for a single book
 │   │   ├── BookList.jsx          # Renders grid/list of BookCard components
 │   │   ├── Loader.jsx            # Loading spinner component
 │   │   ├── NavBar.jsx            # Top navigation header
 │   │   └── SearchBar.jsx         # Search input with onSearch handler
 │   ├── pages/
 │   │   ├── BookSearchResult.jsx  # Shows search results
 │   │   ├── Browse.jsx            # Browse all books
 │   │   ├── Details.jsx           # Book details page
 │   │   ├── Home.jsx              # Homepage with search bar
 │   │   ├── Login.jsx             # User login page
 │   │   ├── MyBooks.jsx           # User saved books page
 │   │   └── SignUp.jsx            # User registration page
 │   ├── services/
 │   │   ├── openLibrary.js        # API client for Open Library
 │   ├── App.jsx                   # Main routing and page navigation
 │   ├── App.css                   # Global styles
 │   ├── index.css                 # Tailwind CSS imports
 │   └── main.jsx                  # React entry point
 ├── .gitignore
 ├── package.json
 ├── package-lock.json
 ├── postcss.config.js
 └── index.html


---

## 📖 Features

🔍 Search for books by title, author, or keyword
📚 Browse and view detailed information about books
🧭 Navigation between multiple pages using React Router DOM
⏳ Loader and “No books found” feedback
📱 Fully responsive UI with Tailwind CSS
🔑 User authentication (Sign Up, Login, Sign Out)
🧾 User dashboard / saved books in MyBooks.jsx
---

## 🛠 Tech Stack

⚛️ React
🚀 Vite
🎨 Tailwind CSS
🌐 React Router DOM
📚 Open Library API

---
## 📌 Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

* `feat:` → Add a new feature
* `fix:` → Fix a bug
* `chore:` → Setup/config changes
* `docs:` → Documentation updates

---
## 📜 License
MIT License

✨ Summary:
The Book Library App supports multiple pages (Home, Browse, Details, Search Results, MyBooks, Login/SignUp) and allows users to search, explore, and manage book collections with responsive navigation and authentication support.
