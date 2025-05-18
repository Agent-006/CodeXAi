import express from "express";
import morgan from "morgan";
import dbConnect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import xaiRoutes from "./routes/xai.routes.js";
import cookieParser from "cookie-parser";
import { vercelCors, corsOptions } from "./middleware/cors.js";
import cors from "cors";

// connect to the database
dbConnect();

const app = express();

// Use different middleware based on environment
if (process.env.VERCEL_ENV === "production") {
    app.use(vercelCors);
} else {
    app.use(cors(corsOptions));
}

// Handle preflight globally
app.options("*", (req, res) => res.status(200).end());

// log requests to the console
app.use(morgan("dev"));

// parse json requests
app.use(express.json());

// parse urlencoded requests
app.use(express.urlencoded({ extended: true }));

// parse cookie requests
app.use(cookieParser());

// use user routes
app.use("/api/users", userRoutes);

// use project routes
app.use("/api/projects", projectRoutes);

// use ai routes
app.use("/api/xai", xaiRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/api/", (req, res) => {
    res.send("Welcome to the server");
});

app.get("/api/healthcheck", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

export default app;
