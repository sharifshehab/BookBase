import { Router } from "express";
import { borrowedController } from "./borrow.controller";


export const borrowedRoutes = Router();

borrowedRoutes.post('/borrow', borrowedController.borrowBook); // add new book route

