"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_route_1 = require("../book/book.route");
const borrow_route_1 = require("../borrow/borrow.route");
const routes = (0, express_1.Router)();
routes.use('/api', book_route_1.bookRoutes); // book API-endpoint
routes.use('/api', borrow_route_1.borrowedRoutes); // borrow API-endpoint
exports.default = routes;
