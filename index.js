/*
|--------------------------------------------------------------------------
| Node Web-server Copyright © 2021 rvnrstnsyh All Rights Reserved
|--------------------------------------------------------------------------
|
| Author    : rasetiansyah
| Twitter   : https://twitter.com/xphrdite
| Github    : https://github.com/xaaphrodite
| LinkedIn  : https://www.linkedin.com/in/rivane-rasetiansyah-b55199212
|
*/

// Dependencies
require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Configurations
const App = express();
const server = http.createServer(App);
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;
const URI = `http://${HOST}:${PORT}`;
const PATH = require("path");
const CORS = /^.+localhost(3000|8080|8000)$/;
const CONF = {
    origin: CORS || URI,
    optionsSuccesStatus: 200,
};

// CSRF
const csrfProtection = require("./app/middleware/csrfMiddleware");

// Global Request Limit
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: false,
        code: 429,
        message: "Too many requests, Your IP is temporarily blocked.",
    },
});

//  Apply to all requests
App.use(limiter);

// Production conditions
if (process.env.NODE_ENV === "production") {
    App.use((request, response, next) => {
        console.log(`${request.method} ${URI}${request.url}`);
        next();
        // Protocol conditions
        // if (request.header("x-forwarded-proto") !== "https") {
        //   response.redirect(`https://${request.header("host")}${request.url}`);
        // } else {
        //   next();
        // }
    })
        .use(cors(CONF))
        .use(cookieParser())
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .set("view engine", "ejs")
        .use(express.static(PATH.join(__dirname + "/public")))
        .use("/api", require("./routes/api"))
        .use("/", express.static(PATH.join(__dirname, "/dist")))
        .get(/.*/, csrfProtection, (request, response) => {
            response
                .cookie("saveMe", request.csrfToken())
                .render(PATH.join(__dirname, "/dist/index"));
        });
}

const io = require("socket.io")(server, {
    cors: {
        origin: URI,
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin"],
        credentials: true,
    },
});

// Server listen
server.listen(PORT, () =>
    console.log(`CORS|CSRF enabled, nodeWebServer is listening on ${URI}`)
);

// Socket.io
module.exports = io;
