import express, { json } from 'express'
import noteRouter from "./routes/notesRouter.js"
import dotenv from 'dotenv'
import connectDB from './config/db.js';
const app = express();
dotenv.config({quiet: true});
connectDB();
// Using Middlewares 
app.use(json());

// const noteRouter = require("./routes/notesRouter");

app.use('/api/notes', noteRouter);

app.listen(3000, () => {
    console.log("Listening To Port: 3000");
});