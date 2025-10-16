import { useLocation } from "react-router-dom";
import BookList from "../components/BookList";
import { useState, useEffect } from "react";

const BookSearchResult = () => {
  const location = useLocation();
  const { books = [], query = "" } = location.state || {};

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h2 className="text-center font-bold text-2xl md:text-4xl mb-6">
        Search Results
      </h2>

      {!isOnline && (
        <p className="text-center text-red-500 mb-6">
          ⚠️ You are currently offline. Results may not be up-to-date.
        </p>
      )}

      {query ? (
        <p className="text-center text-gray-600 mb-6">
          Showing results for: <span className="font-semibold">{query}</span>
        </p>
      ) : (
        <p className="text-center text-gray-600 mb-6">
          No search query provided.
        </p>
      )}

      {books.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg font-medium">
          {isOnline
            ? "No books found."
            : "Cannot fetch books while offline. Please check your connection."}
        </p>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
};

export default BookSearchResult;
