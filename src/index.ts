import express from 'express';
import mongoose from 'mongoose';
import  dotenv from 'dotenv';
import authRouter from './route/authBookRoutes';
import  cors from 'cors';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors());

app.use('/api',authRouter)

const mongouri = process.env.Mongo_URI;

mongoose.connect(mongouri || "mongodb+srv://dheeraj2032006_db_user:E6XfPVS7ROw7hnf2@cluster0.x8nvyzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {dbName: "Book_Management"})
.then(()=>{
    console.log("MongoDB Connected")
    app.listen(PORT,()=>{
        console.log(`Server has Started on Port ${PORT}`)
    })
})
.catch((err: mongoose.Error)=>{
    console.log(err)
})

