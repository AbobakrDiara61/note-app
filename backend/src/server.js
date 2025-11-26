import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './config/db.js';
import noteRouter from "./routes/notesRouter.js"
import rateLimiter from './middlewares/rateLimiter.js';

const app = express();
const __dirname = path.resolve();
console.log(__dirname);
dotenv.config({quiet: true});
// connectDB();
// Using Middlewares 
// app.use(cors()); // allow access every requests for any url 
if(process.env.NODE_ENV === "development") {
    app.use(
        cors({
            origin: ["http://localhost:5173"],
        }
    ));
}
app.use(json());
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    app.use(rateLimiter);
}
// const noteRouter = require("./routes/notesRouter");

app.use('/api/notes', noteRouter);

if(process.env.NODE_ENV == "production") {
    //serve our op react app as static asset
    app.use(express.static(path.join(__dirname, "../frontend/dist"))); 

    // if we get any route other than our api/notes
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/", "dist","index.html"));
    });
}

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Listening To Port: 3000");
    });
})