import "dotenv/config.js"; // load environment variables

import http from "http";
import app from "./app.js";

import { Server } from "socket.io";

import jwt from "jsonwebtoken";

import mongoose from "mongoose";
import Project from "./models/project.model.js";
import { getUserById } from "./services/user.service.js";
import { XaiServiceGenerateResult } from "./services/xai.service.js";

const server = http.createServer(app); // create a server

const PORT = process.env.PORT || 3000; // 3000 is the default port

// Socket.io
const io = new Server(server, {
    cors: {
        origin: "https://codexai-orpin.vercel.app/",
    },
});

// middleware
io.use(async (socket, next) => {
    try {
        const token =
            socket.handshake.auth?.token ||
            socket.handshake.headers.authorization?.split(" ")[1];

        const projectId = socket.handshake.query.projectId;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error("Invalid project ID"));
        }

        if (!token) {
            return next(new Error("Authentication error - no token"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new Error("Authentication error - invalid token"));
        }

        socket.project = await Project.findById(projectId).lean();

        socket.user = decoded;
        next();
    } catch (error) {
        next(new Error("Invalid token"));
    }
});

// socket.io events
io.on("connection", async (socket) => {
    socket.roomId = socket.project._id.toString();

    console.log("A user connected");

    console.log(socket.roomId);

    socket.join(socket.roomId);

    socket.on("project-message", async (data) => {
        console.log(data);

        const message = data.message;

        console.log("message: ", message);

        const isXaiPresent = message.includes("@xai");

        console.log("isXaiPresent: ", isXaiPresent);

        if (isXaiPresent) {
            const prompt = message.replace("@xai", "").trim();

            console.log("prompt: ", prompt);

            const result = await XaiServiceGenerateResult(prompt);

            console.log("result: ", result);
            data = {
                sender: {
                    _id: "xai",
                    email: "xai@gmail.com",
                },
                message: result,
            };
            console.log(data);
            io.to(socket.roomId).emit("project-message", data);

            return;
        }

        getUserById(data.sender).then((user) => {
            console.log(user);
            data = {
                ...data,
                sender: user,
            };
            console.log(data);
            socket.broadcast.to(socket.roomId).emit("project-message", data);
        });
    });

    socket.on("disconnect", () => {
        /* … */
        console.log("A user disconnected");
        socket.leave(socket.roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
