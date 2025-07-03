import { Model, Types } from "mongoose"

export interface IBorrow {
    bookID: Types.ObjectId,
    quantity: number,
    dueDate: Date,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface BorrowBook extends Model<IBorrow>{
    handleBookQuantity(id: string, quantity: number): Promise<boolean>
}

