import BookForm from "../components/BookForm";
import api_url from "../api/bookService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddBookPage() {
  const navigate = useNavigate();

  const handleAdd = async (book) => {
    try {
      const res=await fetch(`${api_url}/books`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(book)
      });
      if(!res.ok){
        throw new Error(`Http error ! Status : ${Response.status}`);
      }
      toast.success("Book added successfully!");
      navigate("/");
    } catch {
      toast.error("Failed to add book");
    }
  };

  return <BookForm onSubmit={handleAdd} />;
}
