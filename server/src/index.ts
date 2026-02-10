import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

dotenv.config();

app.get("/", (req, res) => {
    res.send("hello world");
})

connectDB();

app.listen(port, () => {
    console.log(`server running in http://localhost:${port}`);
});
