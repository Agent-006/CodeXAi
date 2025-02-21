import "dotenv/config.js"; // load environment variables

import http from "http";
import app from "./app.js";

import { Server } from "socket.io";

import jwt from "jsonwebtoken";

const server = http.createServer(app); // create a server

const PORT = process.env.PORT || 3000; // 3000 is the default port

// Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// middleware
io.use((socket, next) => {
    try {
        const token =
            socket.handshake.auth?.token ||
            socket.handshake.headers.authorization?.split(" ")[1];

        if (!token) {
            return next(new Error("Authentication error - no token"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new Error("Authentication error - invalid token"));
        }

        socket.user = decoded;
        next();
    } catch (error) {
        next(new Error("Invalid token"));
    }
});

// socket.io events
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("event", (data) => {
        /* … */
    });
    socket.on("disconnect", () => {
        /* … */
        console.log("A user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
