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
                message: "Validation failed",
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
        
    }
}

export const bookController = {
    addBook,
    getBooks
}
