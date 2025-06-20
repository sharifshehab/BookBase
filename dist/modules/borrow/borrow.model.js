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
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("../book/book.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Please provide a valid book-id."]
    },
    quantity: {
        type: Number,
        required: [true, "Please provide quantity."],
        min: [0, 'Quantity have to be a positive number, got {VALUE}'],
    },
    dueDate: {
        type: Date,
        required: [true, "Please provide the book returned date."],
    }
}, {
    versionKey: false,
    timestamps: true
});
borrowSchema.static("handleBookQuantity", function (bookId, bookQuantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.Book.findById(bookId);
        if (!book || book.copies < bookQuantity) {
            return false;
        }
        const manageQuantity = yield book_model_1.Book.findByIdAndUpdate(bookId, { $inc: { copies: -bookQuantity } }, {
            new: true,
            runValidators: true,
        });
        if (manageQuantity && manageQuantity.copies === 0) {
            yield book_model_1.Book.findByIdAndUpdate(bookId, { available: 'false' }, {
                new: true,
                runValidators: true,
            });
        }
        return true;
    });
});
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
