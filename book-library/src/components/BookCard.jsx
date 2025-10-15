
import React from "react";

const BookCard = ({ book, onAdd, onStatusChange }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center">
      {/* Cover */}
      {book.cover_i || book.coverId ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i || book.coverId}-M.jpg`}
          alt={book.title}
          className="mb-4 w-32 h-48 object-cover rounded"
        />
      ) : (
        <div className="mb-4 w-32 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Title */}
      <h2 className="text-xl font-bold text-center">{book.title}</h2>

      {/* Authors */}
      {book.author_name || book.authors ? (
        <p className="text-gray-700 mt-1 text-center">
          Author: {(book.author_name || book.authors).join(", ")}
        </p>
      ) : null}

      {/* Publisher */}
      {book.publisher ? (
        <p className="text-gray-600 mt-1 text-center">
          Publisher: {Array.isArray(book.publisher) ? book.publisher[0] : book.publisher}
        </p>
      ) : null}

      {/* Published Date */}
      {book.first_publish_year || book.publishedDate ? (
        <p className="text-gray-600 mt-1 text-center">
          Published: {book.first_publish_year || book.publishedDate}
        </p>
      ) : null}

      {/* Add Button */}
      {onAdd && (
        <button
          onClick={onAdd}
          className="mt-3 bg-blue-900 text-white px-4 py-1 rounded hover:bg-blue-800 transition"
        >
          Add to My Books
        </button>
      )}

      {/* Reading Status */}
      {onStatusChange && (
        <select
          value={book.status}
          onChange={(e) => onStatusChange(book.id, e.target.value)}
          className="mt-3 border rounded px-2 py-1"
        >
          <option value="Currently Reading">Currently Reading</option>
          <option value="Completed">Completed</option>
          <option value="Want to Read">Want to Read</option>
        </select>
      )}
    </div>
  );
};

export default BookCard;
