import { model, Schema } from "mongoose";
import { BorrowBook, IBorrow } from "./borrow.interface";
import { Book } from "../book/book.model";

const borrowSchema = new Schema<IBorrow, BorrowBook>({
    book: {
        type: Schema.Types.ObjectId,
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
},
    {
        versionKey: false,
        timestamps: true
    }
);

borrowSchema.static("handleBookQuantity", async function (bookId: string, bookQuantity: number): Promise<boolean> {

    const book = await Book.findById(bookId);

    if (!book || book.copies < bookQuantity) {
        return false;
    }

    const manageQuantity = await Book.findByIdAndUpdate(bookId, {$inc: { copies: -bookQuantity }}, {
        new: true,
        runValidators: true,
    });

    if (manageQuantity && manageQuantity.copies === 0) {
        await Book.findByIdAndUpdate(bookId, {available: 'false'} , {
            new: true,
            runValidators: true,
        });
    }
    return true;

});

export const Borrow = model<IBorrow, BorrowBook>('Borrow', borrowSchema);

    