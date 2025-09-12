import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './route/authBookRoutes.js';
import cors from 'cors';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use('/api', authRouter);
const mongouri = process.env.Mongo_URI;
mongoose.connect(mongouri || "", { dbName: "Book_Management" })
    .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
        console.log("Server has Started on Port", process.env.PORT);
    });
})
    .catch((err) => {
    console.log(err);
});
