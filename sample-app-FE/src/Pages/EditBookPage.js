import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";
import api_url from "../api/bookService";
import { toast } from "react-toastify";
import axios from "axios";

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    axios.get(`${api_url}/books/${id}`)
      .then(res => setBookData(res.data))
      .catch(() => toast.error("Failed to fetch book details"));
  }, [id]);

  const handleUpdate = async (updatedBook) => {
    try {
      await axios.put(`${api_url}/books/${id}`, updatedBook);
      toast.success("Book updated successfully!");
      navigate("/");
    } catch {
      toast.error("Failed to update book");
    }
  };

  return bookData ? <BookForm initialData={bookData} onSubmit={handleUpdate} /> : null;
}
