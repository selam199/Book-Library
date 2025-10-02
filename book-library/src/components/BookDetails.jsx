const BookDetails = ({ book }) => {
  if (!book) return null;

  const cover = book.covers
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "/placeholder-book.png";

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8">
      <img
        src={cover}
        alt={book.title}
        className="w-full md:w-1/3 rounded shadow"
      />
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-600 text-sm md:text-base">
          <span className="font-semibold">Authors:</span>{" "}
          {book.authors?.map((a) => a.name).join(", ")}
        </p>
        <p className="mb-2">
          <span className="font-semibold">First Published:</span>{" "}
          {book.first_publish_date || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Subjects:</span>{" "}
          {book.subjects?.join(", ") || "N/A"}
        </p>
        <p className="mt-4">
          {book.description?.value ||
            book.description ||
            "No description available."}
        </p>
      </div>
    </div>
  );
};

export default BookDetails;
