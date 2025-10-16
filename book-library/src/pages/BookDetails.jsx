import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../services/firebaseConfig";
import { addBookToReadingList } from "../services/bookService";

const BookDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state || {};

  const [message, setMessage] = useState(""); // For success/error messages

  if (!book) {
    return (
      <div className="text-center mt-10">
        <p>Book not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  const cover =
    book.cover_i || book.covers
      ? `https://covers.openlibrary.org/b/id/${book.cover_i || book.covers?.[0]}-L.jpg`
      : "/placeholder-book.png";

  const handleAddBook = async () => {
    if (!auth.currentUser) {
      setMessage("Please log in to save books!");
      navigate("/login");
      return;
    }

    try {
      await addBookToReadingList(
        {
          title: book.title,
          authors:
            book.author_name ||
            book.authors?.map((a) => a.name) ||
            ["Unknown Author"],
          publisher:
            book.publisher?.[0] ||
            book.publishers?.[0] ||
            "Unknown Publisher",
          publishedDate:
            book.first_publish_year || book.first_publish_date || "N/A",
          coverId: book.cover_i || book.covers?.[0],
          key: book.key,
        },
        auth.currentUser.uid
      );

      setMessage(`"${book.title}" has been added to your reading list!`);
    } catch (err) {
      setMessage(err.message || "Something went wrong.");
    }

    // Automatically clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8 px-4 md:px-10">
      <img
        src={cover}
        alt={book.title}
        className="w-full md:w-1/3 rounded shadow-md object-cover"
      />
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{book.title}</h2>

        <p className="text-gray-700 text-sm md:text-base mb-2">
          <span className="font-semibold">Authors:</span>{" "}
          {book.author_name?.join(", ") ||
            book.authors?.map((a) => a.name).join(", ") ||
            "Unknown"}
        </p>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Publisher:</span>{" "}
          {book.publisher?.[0] || book.publishers?.[0] || "Unknown"}
        </p>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">First Published:</span>{" "}
          {book.first_publish_year || book.first_publish_date || "N/A"}
        </p>

        <p className="text-gray-600 mt-4">
          {book.description?.value ||
            book.description ||
            "No description available for this book."}
        </p>

        <button
          onClick={handleAddBook}
          className="mt-6 bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-800 transition-all"
        >
          Add to My Books
        </button>

        {message && (
          <p className="mt-3 text-center text-green-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
