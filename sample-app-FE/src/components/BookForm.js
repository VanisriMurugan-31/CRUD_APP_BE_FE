import { TextField, Button, Paper, Box } from "@mui/material";
import { useState, useEffect } from "react";

export default function BookForm({ initialData, onSubmit }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publicationYear: "",
    genre: ""
  });

  useEffect(() => {
    if (initialData) setBook(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book);
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <TextField label="Title" name="title" value={book.title} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Author" name="author" value={book.author} onChange={handleChange} fullWidth margin="normal" required />
        <TextField label="Publication Year" name="publicationYear" value={book.publicationYear} onChange={handleChange} type="number" fullWidth margin="normal" required />
        <TextField label="Genre" name="genre" value={book.genre} onChange={handleChange} fullWidth margin="normal" required />
        <Box mt={2}>
          <Button type="submit" variant="contained" fullWidth>Save</Button>
        </Box>
      </form>
    </Paper>
  );
}
