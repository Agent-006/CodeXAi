import dotenv from "dotenv";

import http from "http";
import app from "./app.js";

dotenv.config(); // load environment variables

const server = http.createServer(app); // create a server

const PORT = process.env.PORT || 3000; // 3000 is the default port

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});