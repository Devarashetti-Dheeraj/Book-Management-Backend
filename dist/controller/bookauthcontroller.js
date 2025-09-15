"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBook = exports.getBookById = exports.getAllbooks = exports.addBook = void 0;
const BookModel_1 = require("../model/BookModel");
const addBook = async (req, res) => {
    try {
        const book = new BookModel_1.Book(req.body);
        const savedBook = await book.save();
        res.status(201).json({
            message: "Book Added Succesfully",
            data: savedBook
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to Add Book",
            error: err instanceof Error ? err.message : err
        });
    }
};
exports.addBook = addBook;
const getAllbooks = async (req, res) => {
    try {
        const books = await BookModel_1.Book.find();
        const allBooks = books.map((book) => ({
            _id: book._id,
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
            error: err instanceof Error ? err.message : err,
        });
    }
};
exports.getAllbooks = getAllbooks;
const getBookById = async (req, res) => {
    try {
        const book = await BookModel_1.Book.findById(req.params.id);
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
            error: err instanceof Error ? err.message : err
        });
    }
};
exports.getBookById = getBookById;
const deleteBook = async (req, res) => {
    try {
        const book = await BookModel_1.Book.findByIdAndDelete(req.params.id);
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
            error: err instanceof Error ? err.message : err
        });
    }
};
exports.deleteBook = deleteBook;
const updateBook = async (req, res) => {
    try {
        const book = await BookModel_1.Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
            error: err instanceof Error ? err.message : err
        });
    }
};
exports.updateBook = updateBook;
