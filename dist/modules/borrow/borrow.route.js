"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowedRoutes = void 0;
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
exports.borrowedRoutes = (0, express_1.Router)();
exports.borrowedRoutes.post('/borrow', borrow_controller_1.borrowedController.borrowBook); // borrow book route
exports.borrowedRoutes.get('/borrow', borrow_controller_1.borrowedController.borrowedSummary); // borrowed book summary route
