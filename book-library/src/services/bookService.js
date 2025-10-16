import { db, auth } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

/**
 * Adds a selected book to the user's reading list in Firestore.
 * @param {Object} book - The book data from Open Library API.
 */
export const addBookToReadingList = async (book) => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in to add books to your reading list.");
    return;
  }

  try {
    // Extract and normalize book details
    const bookData = {
      title: book.title || "Untitled",
      author: book.author_name ? book.author_name.join(", ") : "Unknown Author",
      publishedDate: book.first_publish_year || "N/A",
      coverImage: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "https://via.placeholder.com/200x300?text=No+Cover",
      userId: user.uid,
      addedAt: new Date(),
    };

    // Add to Firestore under "myBooks" collection
    await addDoc(collection(db, "myBooks"), bookData);

    alert(`"${bookData.title}" has been added to your reading list!`);
  } catch (error) {
    console.error("Error adding book:", error);
    alert("Failed to add book. Please try again.");
  }
};
