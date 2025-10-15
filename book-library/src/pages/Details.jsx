import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import BookDetails from "./BookDetails";
import { fetchBookDetails } from "../services/openLibrary";

const Details = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      const details = await fetchBookDetails(id);
      setBook(details);
      setLoading(false);
    };
    loadBook();
  }, [id]);

  return (
    <div className="px-6 py-8">
      {loading ? <Loader /> : <BookDetails book={book} />}
    </div>
  );
};

export default Details;

