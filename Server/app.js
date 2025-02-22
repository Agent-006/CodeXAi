import express from "express";
import morgan from "morgan";
import dbConnect from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import projectRoutes from "./routes/project.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// connect to the database
dbConnect();

const app = express();

app.use(cors());

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

app.get("/api/", (req, res) => {
    res.send("Welcome to the server");
});

export default app;