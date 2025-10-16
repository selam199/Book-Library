import { useEffect, useState } from "react";
import { db, auth } from "../services/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchMyBooks(currentUser.uid);
      } else {
        setMyBooks([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user-specific books
  const fetchMyBooks = async (userId) => {
    try {
      const booksRef = collection(db, "myBooks");
      const q = query(booksRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const books = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMyBooks(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Remove book from Firestore
  const handleRemoveBook = async (bookId) => {
    try {
      await deleteDoc(doc(db, "myBooks", bookId));
      setMyBooks(myBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  // Update reading status
  const handleStatusChange = async (bookId, newStatus) => {
    try {
      const bookRef = doc(db, "myBooks", bookId);
      await updateDoc(bookRef, { status: newStatus });
      setMyBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === bookId ? { ...b, status: newStatus } : b
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading your books...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Please log in to view your saved books.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        📚 My Reading List
      </h2>

      {myBooks.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven’t added any books yet. Browse and add some to your list!
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {myBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
            >
              <img
                src={
                  book.coverImage ||
                  `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg` ||
                  "https://via.placeholder.com/200x300?text=No+Cover"
                }
                alt={book.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {book.author || "Unknown Author"}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {book.publishedDate || "N/A"}
                </p>

                {/* Reading Progress Dropdown */}
                <select
                  value={book.status || "Want to Read"}
                  onChange={(e) =>
                    handleStatusChange(book.id, e.target.value)
                  }
                  className="mb-3 text-sm py-1 px-2 border rounded"
                >
                  <option value="Want to Read">Want to Read</option>
                  <option value="Currently Reading">Currently Reading</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => handleRemoveBook(book.id)}
                  className="mt-auto bg-red-500 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
