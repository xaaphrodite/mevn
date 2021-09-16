/*
|--------------------------------------------------------------------------
| Node Web-server Copyright © 2021 rasetnsyh All Rights Reserved
|--------------------------------------------------------------------------
|
| Author    : rasetiansyah
| Twitter   : https://twitter.com/xphrdite
| Github    : https://github.com/xaaphrodite
| Facebook  : https://www.facebook.com/xaaphrodite
| Instagram : https://www.instagram.com/rasetiansyah_
| Discord   : https://discordapp.com/users/742543110856507482
| LinkedIn  : https://www.linkedin.com/in/rivane-rasetiansyah-b55199212
|
*/

// Dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Configurations
const App = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;
const URI = `http://${HOST}:${PORT}`;
const PATH = require("path");
const CORS = /^.+localhost(3000|8000|3325)$/;
const CONF = {
    origin: CORS || URI,
    optionsSuccesStatus: 200,
};

// CSRF
const csrfProtection = require("./app/middleware/csrfMiddleware");

// Production conditions
if (process.env.NODE_ENV !== "production") {
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
        .use(express.static(PATH.join(__dirname + "/public")))
        .use("/api", require("./routes/api"))
        .use("/", express.static(PATH.join(__dirname, "/dist")))
        .get(/.*/, csrfProtection, (request, response) => {
            response
                .cookie("saveMe", request.csrfToken())
                .render(PATH.join(__dirname, "/dist/index"));
        });
}

// Development conditions
App.use((request, response, next) => {
    console.log(`${request.method} ${URI}${request.url}`);
    next();
    // Protocol conditions
    // if (request.header("x-forwarded-proto") !== "https") {
    //     response.redirect(`https://${request.header("host")}${request.url}`);
    // } else {
    //     next();
    // }
})
    .use(cors(CONF))
    .use(cookieParser())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(PATH.join(__dirname + "/public")))
    .use(express.static(PATH.join(__dirname + "/views")))
    .set("view engine", "ejs")
    // Route prefix
    .use("/", require("./routes/web"))
    .use("/api", require("./routes/api"))
    // Prevent bad url
    .use("/", (request, response) => {
        response.redirect("/");
    });

// Database
if (process.env.DB_CONNECTION === "mongodb") {
    mongoose
        .connect(process.env.DB_URI, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch(() => {
            console.log("MongoDB not connected");
        });
} else if (process.env.DB_CONNECTION === "mysql") {
    const DB = require("./config/Mysql");
    try {
        DB.sequelize.sync();
        console.log("MySQL connected");
    } catch (error) {
        console.log("MySQL not connected");
    }
} else {
    console.log("No Database selected");
}

// Server listen
App.listen(PORT, () =>
    console.log(`CORS|CSRF enabled, xphrdite_web_server is listening on ${URI}`)
);

// Test
// module.exports = App;
