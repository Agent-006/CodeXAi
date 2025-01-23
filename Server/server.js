import "dotenv/config.js"; // load environment variables

import http from "http";
import app from "./app.js";

const server = http.createServer(app); // create a server

const PORT = process.env.PORT || 3000; // 3000 is the default port

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});