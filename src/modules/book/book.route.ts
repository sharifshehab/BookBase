import { Router } from "express";
import { bookController } from "./book.controller";


export const bookRoutes = Router();

bookRoutes.post('/books', bookController.addBook); // add new book route
