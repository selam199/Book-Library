import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { addBookToReadingList } from "../bookService";

const BookDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state || {};

  if (!book) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-gray-700">Book not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Go Back
        </button>
      </div>
    );
  }
  const coverId =
    book.coverId || book.cover_i || (book.covers && book.covers[0]);
  const cover = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "/placeholder-book.png";
  const handleAddBook = async () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    try {
      await addBookToReadingList(auth.currentUser.uid, {
        title: book.title,
        authors: book.authors?.map((a) => a.name),
        publisher: book.publishers?.[0],
        publishedDate: book.first_publish_date,
        coverId,
      });
      const messageBox = document.createElement("div");
      messageBox.textContent = `${book.title} added to your reading list!`;
      messageBox.className =
        "fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500";
      document.body.appendChild(messageBox);

      setTimeout(() => {
        messageBox.style.opacity = "0";
        setTimeout(() => messageBox.remove(), 500);
      }, 2000);
    } catch (err) {
      console.error("Error adding book:", err);
      const messageBox = document.createElement("div");
      messageBox.textContent = "Something went wrong. Please try again.";
      messageBox.className =
        "fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500";
      document.body.appendChild(messageBox);

      setTimeout(() => {
        messageBox.style.opacity = "0";
        setTimeout(() => messageBox.remove(), 500);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8 max-w-6xl mx-auto px-4">
      <img
        src={cover}
        alt={book.title}
        className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
      />
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">{book.title}</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Authors:</span>{" "}
          {book.authors?.map((a) => a.name).join(", ") || "N/A"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Publisher:</span>{" "}
          {book.publishers?.[0] || "N/A"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">First Published:</span>{" "}
          {book.first_publish_date || "N/A"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Subjects:</span>{" "}
          {book.subjects?.join(", ") || "N/A"}
        </p>
        <p className="mt-4 text-gray-800 leading-relaxed">
          {book.description?.value ||
            book.description ||
            "No description available."}
        </p>

        <button
          onClick={handleAddBook}
          className="mt-6 bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-800 transition"
        >
          Add to My Books
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
