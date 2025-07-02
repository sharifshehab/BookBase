import { Router } from "express";
import { bookController } from "./book.controller";

export const bookRoutes = Router();

bookRoutes.post('/create-book', bookController.addBook);               // add new book route
bookRoutes.get('/all-books', bookController.getBooks);                // getting all the books route
bookRoutes.get('/single-book/:id', bookController.getBookById);      // getting book-by-id route     
bookRoutes.patch('/edit-book/:id', bookController.updateBook);      // updating book-by-id route
bookRoutes.delete('/delete-book/:id', bookController.deleteBook);  // deleting book-by-id route

