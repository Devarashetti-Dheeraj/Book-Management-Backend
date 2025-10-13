import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './route/userRoutes';
import routes from './route/authBookRoutes';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api', routes);

app.get('/', (_req, res) => res.json({ message: 'Backend running!' }));

mongoose.connect(process.env.Mongo_URI || 'mongodb://...', { dbName: 'Book_Management' })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Vercel serverless handler
export default (req: any, res: any) => app(req, res);
