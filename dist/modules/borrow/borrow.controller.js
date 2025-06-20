"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowedController = void 0;
const borrow_model_1 = require("./borrow.model");
// borrow book
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity } = req.body;
        const checkAvailability = yield borrow_model_1.Borrow.handleBookQuantity(book, quantity);
        if (!checkAvailability) {
            return res.status(400).send({
                success: false,
                message: "Not enough copies available. Book borrow unsuccessful."
            });
        }
        const borrowed = yield borrow_model_1.Borrow.create(req.body);
        res.status(200).send({
            success: true,
            message: "Book borrowed successfully",
            data: {
                "_id": borrowed._id,
                "book": borrowed.book,
                "quantity": borrowed.quantity,
                "dueDate": borrowed.dueDate,
                "createdAt": borrowed.createdAt,
                "updatedAt": borrowed.updatedAt
            }
        });
    }
    catch (error) {
        const err = error;
        res.status(400).send({
            success: false,
            message: "Error Occurred",
            errors: err.errors
        });
    }
});
// borrowed summary
const borrowedSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summery = yield borrow_model_1.Borrow.aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'book',
                    foreignField: '_id',
                    as: 'borrowedBooks'
                }
            },
            {
                $unwind: '$borrowedBooks'
            },
            {
                $group: {
                    _id: '$borrowedBooks.genre',
                    book: {
                        $addToSet: {
                            title: '$borrowedBooks.title',
                            isbn: '$borrowedBooks.isbn'
                        }
                    },
                    totalQuantity: { $sum: '$quantity' },
                }
            },
            {
                $unwind: '$book'
            },
            {
                $project: {
                    _id: 0,
                    book: '$book',
                    totalQuantity: '$totalQuantity',
                }
            }
        ]);
        res.status(200).send({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summery
            // data: {
            //     "_id": borrowed._id,
            //     "book": borrowed.book,
            //     "quantity": borrowed.quantity,
            //     "dueDate": borrowed.dueDate,
            //     "createdAt": borrowed.createdAt,
            //     "updatedAt": borrowed.updatedAt
            // }
        });
    }
    catch (error) {
        const err = error;
        res.status(400).send({
            success: false,
            message: "Error Occurred",
            errors: err.errors
        });
    }
});
exports.borrowedController = {
    borrowBook,
    borrowedSummary
};
