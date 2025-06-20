"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
exports.bookRoutes = (0, express_1.Router)();
exports.bookRoutes.post('/books', book_controller_1.bookController.addBook); // add new book route
exports.bookRoutes.get('/books', book_controller_1.bookController.getBooks); // getting all the books route
exports.bookRoutes.get('/books/:bookId', book_controller_1.bookController.getBookById); // getting book-by-id route
exports.bookRoutes.patch('/books/:bookId', book_controller_1.bookController.updateBook); // updating book-by-id route
exports.bookRoutes.delete('/books/:bookId', book_controller_1.bookController.deleteBook); // deleting book-by-id route
