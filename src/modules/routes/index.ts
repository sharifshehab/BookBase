import { Router } from "express";
import { bookRoutes } from "../book/book.route";

const routes = Router();

routes.use('/api', bookRoutes); // book API-endpoint

export default routes;