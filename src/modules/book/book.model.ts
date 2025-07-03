import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
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
        required: [true, "Please provide a genre name."],
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE','HISTORY','BIOGRAPHY','FANTASY',],
            message: 'Genre not supported, got {VALUE}'
        }
    },
    isbn: {
        type: String,
        required:  [true, "Please provide isbn number."],
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
},
    {
        versionKey: false,
        timestamps: true
    }
);

// Pre Hook: for changing book available status
bookSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate() as any;
    if (update?.copies === 0) {
        update.available =  false
    } else if ( 0 < update?.copies){
        update.available =  true
    }
    next();
});

// Post Hook: for changing book available status
bookSchema.post('save', async function (doc, next) {
    const book = await Book.findById(doc._id);
    if (book && book.copies === 0) {
        await Book.findByIdAndUpdate(doc._id, { available: false }, { new: true }); 
    }
    next();
});

export const Book = model<IBook>('Book', bookSchema);

    