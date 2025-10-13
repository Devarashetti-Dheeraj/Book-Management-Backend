import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './route/userRoutes';
import routes from './route/authBookRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api', routes);


app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Backend is running!' });
});

// MongoDB Connection
const mongouri = process.env.Mongo_URI;

mongoose
  .connect(
    mongouri || "mongodb+srv://dheeraj2032006_db_user:E6XfPVS7ROw7hnf2@cluster0.x8nvyzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { dbName: "Book_Management" }
  )
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err: mongoose.Error) => {
    console.error("❌ MongoDB Error:", err);
  });

// // ❌ NO app.listen() here, Vercel will handle it
// // Start Server (only for local development)
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
export default app;
