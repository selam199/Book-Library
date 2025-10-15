import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

const MyBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    const fetchBooks = async () => {
      try {
        // Example: fetch books on "fantasy" subject, limit 9
        const response = await fetch(
          "https://openlibrary.org/subjects/fantasy.json?limit=9"
        );
        const data = await response.json();
        setBooks(data.works);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  if (!auth.currentUser) return null;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Books</h1>
      <p className="text-lg mb-6">Welcome, {auth.currentUser.email}</p>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {books.map((book) => (
            <div
              key={book.key}
              className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center"
            >
              {book.cover_id && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                  alt={book.title}
                  className="mb-4 w-32 h-48 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-bold text-center">{book.title}</h2>
              {book.authors && (
                <p className="text-gray-700 mt-1 text-center">
                  Author: {book.authors.map((a) => a.name).join(", ")}
                </p>
              )}
              {book.publishers && (
                <p className="text-gray-600 mt-1 text-center">
                  Publisher: {book.publishers.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
