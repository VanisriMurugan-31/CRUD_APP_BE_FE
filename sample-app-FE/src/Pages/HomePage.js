import { useEffect, useState } from "react";
import api_url from "../api/bookService";
import BookTable from "../components/BookTable";
import { toast } from "react-toastify";
import axios from "axios";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState("");

  const fetchBooks = async () => {
  try {
    const params = {};
    if (filterAuthor) params.author = filterAuthor;
    const res = await axios.get(`${api_url}/books`, { params });
    setBooks(res.data);
  } catch (err) {
    toast.error("Error fetching books");
  }
};

  useEffect(() => {
    fetchBooks();
  }, [filterAuthor]);

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${api_url}/books/${id}`);
      toast.success("Book deleted");
      fetchBooks();
    } catch {
      toast.error("Failed to delete book");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <BookTable
        books={books}
        onDelete={deleteBook}
        onFilter={setFilterAuthor}
      />
    </div>
  );
}
