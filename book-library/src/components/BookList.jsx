import BookCard from "./BookCard";
import { useLocation, Link } from "react-router-dom";

const BookList = ({ books: propBooks }) => {
  const location = useLocation();
  
  // Prefer books from location.state if available
  const stateBooks = location.state?.books;
  const books = stateBooks || propBooks || [];

  if (!books.length) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No books found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {books.map((book) => (
        <Link
          key={book.key || book.id}
          to="/book-details"
          state={{ book }} // pass the book to BookDetails
        >
          <BookCard book={book} />
        </Link>
      ))}
    </div>
  );
};

export default BookList;


