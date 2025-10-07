import {Router} from 'express';
import { addBook, getAllbooks, getBookById, deleteBook, updateBook } from "../controller/bookauthcontroller";

const routes: Router = Router();

routes.post('/addBook', addBook)
routes.get('/getAllBooks', getAllbooks)
routes.get('/getBookById/:id', getBookById)
routes.delete('/deleteBook/:id', deleteBook)
routes.put('/updateBook/:id', updateBook)

export default routes