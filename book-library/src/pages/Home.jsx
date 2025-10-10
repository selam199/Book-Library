 import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import Loader from "../components/Loader";
import { searchBooks } from "../services/openLibrary";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSearch = async () => {
    setLoading(true);
    const results = await searchBooks(query);
    setBooks(results);
    setLoading(false);

    navigate("/books", {
      state: { books:results, query}
    });
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h2 className="text-center font-bold sm:mt-4 sm:mb-4 sm:text-xl md:mt-48 md:mb-10 md:text-4xl lg:text-6xl ">
        Discover Your Next Great Read
      </h2>
      <p className="text-center text-base sm:text-xl lg:text-2xl text-gray-600 mb-6">
        Explore vast collections of books from timeless classics to the latest
        bestsellers.
      </p>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      {loading ? <Loader /> : <BookList books={books} />}
    </div>
  );
};

export default Home;


