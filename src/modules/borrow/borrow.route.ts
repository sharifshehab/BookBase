import { Router } from "express";
import { borrowedController } from "./borrow.controller";


export const borrowedRoutes = Router();

borrowedRoutes.post('/borrow-books', borrowedController.borrowBook);           // borrow book route
borrowedRoutes.get('/borrowed-summary', borrowedController.borrowedSummary);  // borrowed book summary route

