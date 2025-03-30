import cors from 'cors';
import express from 'express';
import { connectToMongoDb } from './db/index.js';
import authRouter from './routes/auth.js';
import collectionRouter from './routes/collections.js';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin:['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials:true
    }
));

//routes


app.use('/api/v1/auth', authRouter);

app.use('/api/v1/collections', collectionRouter);



connectToMongoDb()
app.listen(port, () => console.log('Server is running on port', port));