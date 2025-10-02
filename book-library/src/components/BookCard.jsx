import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/placeholder-book.png";

  return (
    <Link
      to={`/details/${book.key.replace("/works/", "")}`}
      className="bg-white shadow rounded p-4 hover:shadow-lg transition"
    >
      <img
        src={cover}
        alt={book.title}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-gray-600 text-sm">{book.author_name?.join(", ")}</p>
    </Link>
  );
};

export default BookCard;
