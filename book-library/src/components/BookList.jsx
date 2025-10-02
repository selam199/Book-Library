import BookCard from "./BookCard";

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No books found.</p>;
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
