import BookSchema from "../model/BookModel.js";
import type { Request, Response } from "express";

export const addBook = async (req: Request,res: Response)=>{
    try{
        const book = new BookSchema(req.body)
        const savedBook = await book.save()
        res.status(201).json({
            message: "Book Added Succesfully",
            data: savedBook
        })
    }catch(err){
        res.status(400).json({
            message: "Failed to Add Book",
            error: err
        })
    }
}

export const getAllbooks = async (req: Request, res: Response) => {
  try {
    const books = await BookSchema.find();
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
  } catch (err) {
    res.status(400).json({
      message: "Failed to Get All Book",
      error: err,
    });
  }
};

export const getBookById = async (req: Request, res: Response)=>{
    try{
        const book = await BookSchema.findById(req.params.id)
        if(!book){
            return res.status(400).json({
                message: "Book Not Found"
            })
        }
        res.status(201).json({
            message: "Success",
            data: book
        })
    }catch(err){
        res.status(400).json({
            message: "Failed to Get Book",
            error: err
        })
    }
}

export const deleteBook = async (req: Request, res: Response)=>{
    try{
        const book = await BookSchema.findByIdAndDelete(req.params.id)
        if(!book){
            return res.status(400).json({
                message: "Book Not Found"
            })
        }
        res.status(201).json({
            message: "Success",
            data: book
        })
    }catch(err){
        res.status(400).json({
            message: "Failed to Delete Book",
            error: err
        })
    }
}

export const updateBook = async(req:Request, res: Response) => {
    try{
        const book = await BookSchema.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
        if(!book){
            return res.status(400).json({
                message: "Book Not Found"
            })
        }
        res.status(201).json({
            message: "Book Updated Successfully",
            data: book
        })

    }catch(err){
        res.status(400).json({
            message: "Book Not Found",
            error: err
        })
    }
}