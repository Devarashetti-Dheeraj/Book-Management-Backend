import mongoose, {Document, Schema} from "mongoose";

//making a ts interface
export interface IBook extends Document { // it means this interface will include all the fields that Mongoose automatically puts on every document (_id, createdAt, etc.), plus the fields we define (title, author...
    title: string;
    author: string;
    genre: string;
    publishedDate: string;
}

const BookModel: Schema<IBook> = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: String,   
        required: true
    },
    publishedDate:{
        type: String,
        required: true
    }
})

export default mongoose.model<IBook>('books',BookModel)

