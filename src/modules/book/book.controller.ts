import { Request, Response } from "express";
import { Book } from "./book.model";

// add new book
const addBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).send(
            {
                success: true,
                message: "Book added successfully",
                data: book
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

export const bookController = {
    addBook
}
