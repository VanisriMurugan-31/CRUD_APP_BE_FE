package com.example.demo.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.example.demo.model.Book;
import com.example.demo.repository.BooksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BooksRepository booksRepository;

    // Save a book
    public Book saveBook(Book book) {
        return booksRepository.save(book);
    }

    // Get all books
    public List<Book> getAllBooks() {
        return booksRepository.findAll();
    }

    // Get book by ID
    public Optional<Book> getBookById(Long id) {
        return booksRepository.findById(id);
    }

    // Update book
    public Book updateBook(Long id, Book book) {
        book.setId(id);
        return booksRepository.save(book);
    }

    // Delete book
    public void deleteBook(Long id) {
        booksRepository.deleteById(id);
    }

    // Filter books by author and/or genre
//    public List<Book> filterBooks(String author, String genre) {
//        if (author != null && !author.isEmpty() && genre != null && !genre.isEmpty()) {
//            return booksRepository.findByAuthorContainingIgnoreCaseAndGenreContainingIgnoreCase(author, genre);
//        } else if (author != null && !author.isEmpty()) {
//            return booksRepository.findByAuthorContainingIgnoreCase(author);
//        } else if (genre != null && !genre.isEmpty()) {
//            return booksRepository.findByGenreContainingIgnoreCase(genre);
//        } else {
//            return booksRepository.findAll();
//        }
//    }

    // Search in all fields or get all books
    public List<Book> filterBooks(String keyword) {
        if (keyword != null && !keyword.trim().isEmpty()) {
            return booksRepository.searchAllFields(keyword.trim());
        }

        return booksRepository.findAll();

    }

    //Excel sheet upload
    public void saveBooksFromExcel(MultipartFile file) throws Exception {
        List<Book> books = new ArrayList<>();

        try (InputStream is = file.getInputStream(); Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();
            boolean firstRow = true;

            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // Skip header row
                if (firstRow) {
                    firstRow = false;
                    continue;
                }
                Book book = new Book();
                book.setTitle(currentRow.getCell(0).getStringCellValue());
                book.setAuthor(currentRow.getCell(1).getStringCellValue());
                book.setPublicationYear((int) currentRow.getCell(2).getNumericCellValue());
                book.setGenre(currentRow.getCell(3).getStringCellValue());

                books.add(book);
            }
        }

        booksRepository.saveAll(books);
    }

    }
