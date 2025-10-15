
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import BookCard from "../components/BookCard";

const MyBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    const fetchReadingList = async () => {
      const readingListRef = collection(db, "users", auth.currentUser.uid, "readingList");
      const snapshot = await getDocs(readingListRef);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(list);
      setLoading(false);
    };

    fetchReadingList();
  }, [navigate]);

  // Add book to reading list
  const addBook = async (book) => {
    if (!auth.currentUser) return alert("Login to save books");
    const bookRef = doc(collection(db, "users", auth.currentUser.uid, "readingList"));
    await setDoc(bookRef, { ...book, status: "Want to Read", addedAt: new Date() });
    setBooks((prev) => [...prev, { id: bookRef.id, ...book, status: "Want to Read" }]);
  };


  const handleStatusChange = async (bookId, status) => {
    const bookRef = doc(db, "users", auth.currentUser.uid, "readingList", bookId);
    await updateDoc(bookRef, { status });
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === bookId ? { ...b, status } : b))
    );
  };

  if (!auth.currentUser) return null;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">My Books</h1>
      <p className="text-lg mb-6">Welcome, {auth.currentUser.email}</p>

      {loading ? (
        <p>Loading reading list...</p>
      ) : (
        <>
          {books.length === 0 ? (
            <p>No books in your reading list yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {books.map((book) => (
                <BookCard key={book.id} book={book} onStatusChange={handleStatusChange} />
              ))}
            </div>
          )}
          <button
            onClick={() =>
              addBook({
                title: "1984",
                authors: ["George Orwell"],
                publisher: "Secker & Warburg",
                coverId: 7222246,
              })
            }
            className="mt-6 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Add Sample Book
          </button>
        </>
      )}
    </div>
  );
};

export default MyBooks;
