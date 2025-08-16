import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api_url from "../api/bookService";
import { Paper, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

export default function ViewBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`${api_url}/books/${id}`)
      .then(res => setBook(res.data))
      .catch(() => toast.error("Failed to load book details"));
  }, [id]);

  if (!book) return null;

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>{book.title}</Typography>
      <Typography><strong>Author:</strong> {book.author}</Typography>
      <Typography><strong>Year:</strong> {book.publicationYear}</Typography>
      <Typography><strong>Genre:</strong> {book.genre}</Typography>
      <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 2 }}>
        Back to List
      </Button>
    </Paper>
  );
}
