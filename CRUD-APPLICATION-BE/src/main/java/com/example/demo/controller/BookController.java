package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")  // prefix API routes
@CrossOrigin(maxAge = 3600)
public class BookController {

    private final BookService bookService;

    // Get list of books, with optional filtering
//    @GetMapping
//    public List<Book> listBooks(@RequestParam(required = false) String author,
//                                @RequestParam(required = false) String genre) {
//        return bookService.filterBooks(author, genre);
//    }


    // Search across all fields OR get all books
    @GetMapping
    public List<Book> listBooks(@RequestParam(required = false) String keyword) {
        return bookService.filterBooks(keyword);
    }

    // Get a book by ID
    @GetMapping("/{id}")
    public Optional<Book> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // Create a new book
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }
     

    // Update a book by ID
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    // Delete a book by ID
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }

    //Excel sheet
    @PostMapping("/upload")
    public ResponseEntity<String> uploadBooks(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload a file!");
        }
        try {
            bookService.saveBooksFromExcel(file);
            return ResponseEntity.ok("Books uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error uploading file: " + e.getMessage());
        }
    }
}
