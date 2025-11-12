import express, { json } from 'express'
import noteRouter from "./routes/notesRouter.js"
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';
const app = express();
dotenv.config({quiet: true});
// connectDB();
// Using Middlewares 
app.use(json());
app.use(rateLimiter)
// const noteRouter = require("./routes/notesRouter");

app.use('/api/notes', noteRouter);
connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Listening To Port: 3000");
    });
})