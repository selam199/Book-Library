import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig"; 

/**
 * Adds a book to a user's reading list in Firestore
 * @param {string} uid - The Firebase Auth user UID
 * @param {Object} book - The book object containing title, authors, publisher, etc.
 */
export const addBookToReadingList = async (uid, book) => {
  if (!uid) throw new Error("User not logged in");

  try {
    const bookRef = doc(collection(db, "users", uid, "readingList"));
    await setDoc(bookRef, book);
  } catch (err) {
    console.error("Error adding book:", err);
    throw err;
  }
};
