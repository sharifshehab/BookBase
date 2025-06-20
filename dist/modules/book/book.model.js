"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Please provide a book title."]
    },
    author: {
        type: String,
        required: [true, "Please provide the book author name."]
    },
    genre: {
        type: String,
        required: true,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY',],
            message: 'Genre not supported, got {VALUE}'
        }
    },
    isbn: {
        type: String,
        required: [true, "Please provide isbn number."],
        unique: true
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "Please specify how many copies of the book are available."],
        min: [0, 'Copies must be a positive number, got {VALUE}'],
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
