import express from "express";
import "dotenv/config.js"
import cors from "cors";
import http, { Server } from "http";
import cookieParser from "cookie-parser";
import { initDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { handleClerkWebhook, syncCurrentUser } from "./controllers/webhookController.js";
import meetingRouter from "./routes/meetingRoutes.js";
import { setupSocketId } from "./socket.js";

const app = express();
const server = http.createServer(app)
await initDB()

const allowedOrigins = process.env.ORIGINS.split(",")
app.use(cors({origin: allowedOrigins, credentials: true}))
app.use(cookieParser())

app.use("/api/clerk", express.raw({type: "application/json"}), handleClerkWebhook)
app.use(express.json())
app.use(clerkMiddleware())
app.post("/api/users/sync", syncCurrentUser)

app.get("/", (req, res)=> res.send("API is Live!"))
app.use("/api/meetings", meetingRouter)

const io = new Server(server, {
    cors: {origin: allowedOrigins, credentials: true}
})

setupSocketId(io)

// Centralized Error Handler
app.use((err, _req, res, _next)=>{
    console.error(`[Error] ${err.message}`);
    res.status(500).json({ error: err.message });
})

const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await initDB();
        app.listen(port, ()=>{
            console.log(`Server is running at http://localhost:${port}`)
        });
    } catch (error) {
        console.error("Unable to initialize the database:", error);
        process.exitCode = 1;
    }
}

startServer();