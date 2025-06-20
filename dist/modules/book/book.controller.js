"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const book_model_1 = require("./book.model");
// add new book
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(200).send({
            success: true,
            message: "Book created successfully",
            data: {
                "_id": book._id,
                "title": book.title,
                "author": book.author,
                "genre": book.genre,
                "isbn": book.isbn,
                "description": book.description,
                "copies": book.copies,
                "available": book.available,
                "createdAt": book.createdAt,
                "updatedAt": book.updatedAt
            }
        });
    }
    catch (error) {
        const err = error;
        res.status(400).send({
            success: false,
            message: "Error Occurred",
            errors: err.errors
        });
    }
});
// get all books  
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, filter, sortBy, sort } = req.query;
        let bookLimit = 10;
        if (limit) {
            bookLimit = parseInt(limit);
        }
        const sortingOrder = sort === 'desc' ? -1 : 1;
        let books;
        if (filter && limit && sortBy && sort) {
            books = yield book_model_1.Book.find({ genre: filter }).sort({ [sortBy]: sortingOrder }).limit(bookLimit);
        }
        else {
            books = yield book_model_1.Book.find();
        }
        res.status(200).send({
            success: true,
            message: "Book retrieved successfully",
            data: books
        });
    }
    catch (error) {
        const err = error;
        res.status(400).send({
            success: false,
            message: "Error Occurred",
            errors: err.errors
        });
    }
});
// get book by id  
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
        if (!book) {
            return res.status(400).send({
                success: false,
                message: `No book found with this id, ID: ${req.params.bookId}`,
            });
        }
        res.status(200).send({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });
    }
    catch (error) {
        const err = error;
        res.status(400).send({
            success: false,
            message: "Error Occurred",
            errors: err.errors
        });
    }
});
// update book  
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        res.status(200).send({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    }
    catch (error) {
        const err = error;
        res.status(400).send({
            success: false,
            message: "Error Occurred",
            errors: err.errors
        });
    }
});
// delete book  
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
        res.status(200).send({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        const err = error;
        res.status(400).send({
            success: false,
            message: "Error Occurred",
            errors: err.errors
        });
    }
});
exports.bookController = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
};
