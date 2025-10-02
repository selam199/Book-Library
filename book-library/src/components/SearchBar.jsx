const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books by title, author, or keyword"
        className="w-full sm:w-3/4 md:w-1/2 border rounded px-4 py-2 focus:outline-primary"
      />
      <button
        onClick={onSearch}
        className="mt-4 bg-primary text-white sm:text-xl sm:px-2 sm:py-2 px-6 py-2 rounded-lg hover:bg-blue-900"
      >
        Browse Books
      </button>
    </div>
  );
};

export default SearchBar;
