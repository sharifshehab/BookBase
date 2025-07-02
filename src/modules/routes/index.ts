import { Router } from "express";
import { bookRoutes } from "../book/book.route";
import { borrowedRoutes } from "../borrow/borrow.route";

const routes = Router();

routes.use('/books', bookRoutes);        // book API-endpoint
routes.use('/borrow', borrowedRoutes);  // borrow API-endpoint

export default routes;

