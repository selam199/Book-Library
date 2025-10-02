import axios from "axios";

const BASE_URL = "https://openlibrary.org";

export const searchBooks = async (query) => {
  if (!query) return [];
  try {
    const res = await axios.get(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}`);
    return res.data.docs.slice(0, 20); // limit to 20 results
  } catch (err) {
    console.error("Error fetching books:", err);
    return [];
  }
};

export const fetchBookDetails = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/works/${id}.json`);
    return res.data;
  } catch (err) {
    console.error("Error fetching book details:", err);
    return null;
  }
};