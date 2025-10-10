import BookCard from "./BookCard";
import { useLocation } from "react-router-dom";

const BookList = ({ books: propBooks }) => {
  const location = useLocation();
  
  //  First, check if books were passed via location.state (when navigating)
  const stateBooks = location.state?.books;

  //  Prefer stateBooks if available, otherwise use propBooks
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
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
};

export default BookList;

