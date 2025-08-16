package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


//using author and genre for filter
//public interface BooksRepository extends JpaRepository<Book, Long> {
//	List<Book> findByAuthorContainingIgnoreCase(String author);
//    List<Book> findByGenreContainingIgnoreCase(String genre);
//    List<Book> findByAuthorContainingIgnoreCaseAndGenreContainingIgnoreCase(String author, String genre);
//}


//filter allbooks from db

public interface BooksRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE " +
            "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "CAST(b.publicationYear AS string) LIKE CONCAT('%', :keyword, '%') OR " +
            "LOWER(b.genre) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Book> searchAllFields(@Param("keyword") String keyword);

}