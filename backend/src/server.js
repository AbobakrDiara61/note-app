import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import noteRouter from "./routes/notesRouter.js"
import rateLimiter from './middlewares/rateLimiter.js';

const app = express();
dotenv.config({quiet: true});
// connectDB();
// Using Middlewares 
// app.use(cors()); // allow access every requests for any url 
app.use(
    cors({
        origin: ["http://localhost:5173"],
    }
));
app.use(json());
app.use(rateLimiter);
// const noteRouter = require("./routes/notesRouter");

app.use('/api/notes', noteRouter);
connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Listening To Port: 3000");
    });
})