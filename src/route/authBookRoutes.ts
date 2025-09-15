import express from 'express';
import { addBook, getAllbooks, getBookById, deleteBook, updateBook } from "../controller/bookauthcontroller";

const authRouter = express.Router();

authRouter.post('/addBook', addBook)
authRouter.get('/getAllBooks', getAllbooks)
authRouter.get('/getBookById/:id', getBookById)
authRouter.delete('/deleteBook/:id', deleteBook)
authRouter.put('/updateBook/:id', updateBook)

export default authRouter;