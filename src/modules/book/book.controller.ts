import { Request, Response } from "express";
import { Book } from "./book.model";

// add new book
const addBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).send(
            {
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
            }
        );

    } catch (error) {
        const err = error as any;
        res.status(400).send(
            {
                success: false,
                message: "Error Occurred",
                errors: err.errors
            }
        );
    }
}

// get all books  
const getBooks = async (req: Request, res: Response) => {
    try {
        const { limit, filter, sortBy, sort } = req.query;

        let bookLimit: number = 10;
        if (limit) {
            bookLimit = parseInt(limit as string)
        }
        const sortingOrder = sort === 'desc' ? -1 : 1

        let books;

        if (filter && limit && sortBy && sort) {
            books = await Book.find({genre: filter}).sort({[sortBy as string]: sortingOrder}).limit(bookLimit);
        } else {
            books = await Book.find();
        }
        

        res.status(200).send(
            {
                success: true,
                message: "Book retrieved successfully",
                data: books
            }
        );
    } catch (error) {
        const err = error as any;
        res.status(400).send(
            {
                success: false,
                message: "Error Occurred",
                errors: err.errors
            }
        );
    }
}

// get book by id  
const getBookById = async (req: Request, res: Response): Promise<any> => {
    try {
        const book = await Book.findById(req.params.bookId);

        if (!book) {
            return res.status(400).send({
                success: false,
                message: `No book found with this id, ID: ${req.params.bookId}`,
            })
        }

        res.status(200).send(
            {
                success: true,
                message: "Book retrieved successfully",
                data: book
            }
        );
    } catch (error) {
        const err = error as any;
        res.status(400).send(
            {
                success: false,
                message: "Error Occurred",
                errors: err.errors
            }
        );
    }
}

// update book  
const updateBook = async (req: Request, res: Response) => {
    try {

        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true, runValidators: true});

        res.status(200).send(
            {
                success: true,
                message: "Book updated successfully",
                data: book
            }
        );
    } catch (error) {
        const err = error as any;
        res.status(400).send(
            {
                success: false,
                message: "Error Occurred",
                errors: err.errors
            }
        );
    }
}

// delete book  
const deleteBook = async (req: Request, res: Response) => {
    try {

        const book = await Book.findByIdAndDelete(req.params.bookId);

        res.status(200).send(
            {
                success: true,
                message: "Book deleted successfully",
                data: null
            }
        );
    } catch (error) {
        const err = error as any;
        res.status(400).send(
            {
                success: false,
                message: "Error Occurred",
                errors: err.errors
            }
        );
    }
}

export const bookController = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}
