var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BookSchema from "../model/BookModel.js";
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new BookSchema(req.body);
        const savedBook = yield book.save();
        res.status(201).json({
            message: "Book Added Succesfully",
            data: savedBook
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to Add Book",
            error: err
        });
    }
});
export const getAllbooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield BookSchema.find();
        const allBooks = books.map((book) => ({
            _id: book._id.toString(),
            title: book.title,
            author: book.author,
            genre: book.genre,
            publishedDate: book.publishedDate,
        }));
        res.status(200).json({
            message: "Success",
            data: allBooks,
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to Get All Book",
            error: err,
        });
    }
});
export const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield BookSchema.findById(req.params.id);
        if (!book) {
            return res.status(400).json({
                message: "Book Not Found"
            });
        }
        res.status(201).json({
            message: "Success",
            data: book
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to Get Book",
            error: err
        });
    }
});
export const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield BookSchema.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(400).json({
                message: "Book Not Found"
            });
        }
        res.status(201).json({
            message: "Success",
            data: book
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to Delete Book",
            error: err
        });
    }
});
export const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield BookSchema.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) {
            return res.status(400).json({
                message: "Book Not Found"
            });
        }
        res.status(201).json({
            message: "Book Updated Successfully",
            data: book
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Book Not Found",
            error: err
        });
    }
});
