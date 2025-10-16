import axios from "axios";

const BASE_URL = "https://openlibrary.org";

// Cache to temporarily store last fetched results
let cachedSearchResults = {};
let cachedBookDetails = {};

export const searchBooks = async (query) => {
  if (!query) return [];

  // If offline, return cached results if available
  if (!navigator.onLine) {
    console.warn("Offline mode: returning cached search results");
    return cachedSearchResults[query] || [];
  }

  try {
    const res = await axios.get(
      `${BASE_URL}/search.json?q=${encodeURIComponent(query)}`
    );
    const books = res.data.docs.slice(0, 20); // limit to 20 results
    cachedSearchResults[query] = books; // cache results
    return books;
  } catch (err) {
    console.error("Error fetching books:", err);
    return cachedSearchResults[query] || [];
  }
};

export const fetchBookDetails = async (id) => {
  if (!id) return null;

  if (!navigator.onLine) {
    console.warn("Offline mode: returning cached book details");
    return cachedBookDetails[id] || null;
  }

  try {
    const res = await axios.get(`${BASE_URL}/works/${id}.json`);
    cachedBookDetails[id] = res.data; // cache details
    return res.data;
  } catch (err) {
    console.error("Error fetching book details:", err);
    return cachedBookDetails[id] || null;
  }
};
