import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function BookTable({ books, onDelete, onFilter ,onClear,filterAuthor}) {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField label="Filter" variant="outlined" size="small" value={filterAuthor} onChange={onFilter} />
           <Button  variant="contained"
        color="primary" onClick={onClear}>Clear</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Title</TableCell>
              <TableCell sx={{ color: "#fff" }}>Author</TableCell>
              <TableCell sx={{ color: "#fff" }}>Year</TableCell>
              <TableCell sx={{ color: "#fff" }}>Genre</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => (
              <TableRow key={book.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publicationYear}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/view/${book.id}`} variant="outlined" color="info" size="small" sx={{ mr: 1 }}>View</Button>
                  <Button component={Link} to={`/edit/${book.id}`} variant="outlined" color="warning" size="small" sx={{ mr: 1 }}>Edit</Button>
                  <Button onClick={() => onDelete(book.id)} variant="outlined" color="error" size="small">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
