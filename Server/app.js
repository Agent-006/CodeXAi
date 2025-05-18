import express from "express";
import morgan from "morgan";
import dbConnect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import xaiRoutes from "./routes/xai.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// connect to the database
dbConnect();

const app = express();

const corsOptions = {
    origin: [process.env.CLIENT_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

// enable pre-flight requests for all routes
app.options("*", cors(corsOptions));

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
