import mongoose from "mongoose";
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publishedDate: {
        type: String,
        required: true
    }
});
export default mongoose.model('books', BookSchema);
