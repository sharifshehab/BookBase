import { model, Schema } from "mongoose";
import { BorrowBook, IBorrow } from "./borrow.interface";
import { Book } from "../book/book.model";

const borrowSchema = new Schema<IBorrow, BorrowBook>({
    bookID: {
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


 // "Static" Custom Method: For checking book quantity  
borrowSchema.static("handleBookQuantity", async function (bookID: string, bookQuantity: number): Promise<boolean> {
    const book = await Book.findById(bookID);
    // If book isn't found or book copies are insufficient
    if (!book || book.copies < bookQuantity) {
        return false;
    }
    return true;
});


// Post Hook: Decrees book quantity after borrowed and change book-available status if book quantity is "0"
borrowSchema.post('save', async function (doc, next) {
    
    const changeBookQuantity = await Book.findByIdAndUpdate(doc.bookID, { $inc: { copies: -doc.quantity } }, { new: true }); 

    if (changeBookQuantity && changeBookQuantity.copies === 0) {
        await Book.findByIdAndUpdate(changeBookQuantity._id, { available: false }, { new: true }); 
    } 
    next();
}); 

export const Borrow = model<IBorrow, BorrowBook>('Borrow', borrowSchema);

