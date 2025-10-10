import { useLocation } from "react-router-dom";
import BookList from "../components/BookList";
import Loader from "../components/Loader";

const BookSearchResult = () => {
  const location = useLocation();
  const { books = [], query = "" } = location.state || {};
  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h2 className="text-center font-bold text-2xl md:text-4xl mb-6">
        Search Results
      </h2>

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
          No books found.
        </p>
      ) : (
         <BookList books={books} />
      )}
    </div>
  );
};

export default BookSearchResult;
