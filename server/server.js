import express from "express";
import "dotenv/config.js"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = process.env.ORIGINS.split(",")
app.use(cors({origin: allowedOrigins, credentials: true}))
app.use(cookieParser())

app.use(express.json())

app.get("/", (req, res)=> res.send("API is Live!"))

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})