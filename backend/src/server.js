import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

// middleware
if (process.env.NODE_ENV !== "production") {
    //cors is default in every browser. it sees how the api is called from a different source, so it blocks it. app.use(cors()) allows usage from any source
    app.use(cors({
        origin:"http://localhost:5173",
    }));
}
app.use(express.json()); // allows parsing of middleware bodies, allowing access to req.body
app.use(rateLimiter);



// custom middleware for debugging purposes
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
    });
}


// connect to mongoDB first, then listen to PORT
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server is listening to PORT:", PORT);
    });
});

