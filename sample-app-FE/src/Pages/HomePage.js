import { useEffect, useState } from "react";
import api_url from "../api/bookService";
import BookTable from "../components/BookTable";
import ExcelUpload from "../components/ExcelUpload";
import { toast } from "react-toastify";
import axios from "axios";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [filterAuthor, setFilterAuthor] = useState("");
const handleFilter=(e)=>{
  setFilterAuthor(e.target.value);
}
const handleClear=()=>{
  setFilterAuthor(" ")
}
  const fetchBooks = async () => {
  try {
    const params = {};
    if (filterAuthor && filterAuthor.trim() !==""){
      
    params.keyword = filterAuthor.trim();
    } 
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
      <ExcelUpload onUploadSuccess={fetchBooks} />
      <BookTable
        books={books}
        onDelete={deleteBook}
        onFilter={handleFilter}
        onClear={handleClear}
        filterAuthor={filterAuthor}
      />
    </div>
  );
}
