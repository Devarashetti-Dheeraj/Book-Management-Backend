import express from 'express';
import mongoose from 'mongoose';
import  dotenv from 'dotenv';
import authRouter from './route/userRoutes';
import routes from './route/authBookRoutes';
import  cors from 'cors';

const app = express();

dotenv.config();

app.use(express.json())
app.use(cors());

//Middleware
app.use('/api/auth',authRouter)
app.use('/api', routes)
//Routes


const PORT = process.env.PORT || 8000;
const mongouri = process.env.Mongo_URI;

mongoose.connect(mongouri || "mongodb+srv://dheeraj2032006_db_user:E6XfPVS7ROw7hnf2@cluster0.x8nvyzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {dbName: "Book_Management"})
.then(()=>{
    console.log("MongoDB Connected")
    app.listen(PORT,()=>{
        console.log(`Server has Started on Port ${PORT}`)
    })
    // await Book.insertMany(books)
})
.catch((err: mongoose.Error)=>{
    console.log(err)
})

