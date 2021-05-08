/*
|--------------------------------------------------------------------------
| MongodbExpressVueNode - server
|--------------------------------------------------------------------------
|
| Author    : rasetiansyah
| Github    : https://github.com/xaaphrodite
| Instagram : https://www.instagram.com/rasetiansyah_
| Discord   : https://discordapp.com/users/742543110856507482
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
const HOST = process.env.SERVER_HOST || "localhost";
const PORT = process.env.SERVER_PORT || 8000;
const URL = `${HOST}:${PORT}`;
const PATH = require("path");
const CONF = {
    origin: `http://${URL}`,
    optionsSuccessStatus: 200,
};

// Production conditions
if (process.env.NODE_ENV === "production") {
    App.use("/", express.static(PATH.join(__dirname, "/dist")))
        .use((request, response, next) => {
            console.log(
                `${request.method} ${request.protocol}://${URL}${request.url}`
            );
            next();
        })
        .get(/.*/, (request, response) => {
            response.render(PATH.join(__dirname, "/dist/index"));
        });
}

App.use((request, response, next) => {
    console.log(`${request.method} ${request.protocol}://${URL}${request.url}`);
    next();
})
    .use(cors(CONF))
    .use(cookieParser())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(PATH.join(__dirname + "/public")))
    .use(express.static(PATH.join(__dirname + "/views")))
    .set("view engine", "ejs")
    // Route prefix
    .use("/dev", require("./routes/web"))
    .use("/api", require("./routes/api"))
    // Prevent bad url
    .use("/", (request, response) => {
        response.render("Notfound");
    });

// MongoDB
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Go ahead..");
    })
    .catch((error) => {
        console.error(error);
    });

// Server listen
App.listen(PORT, () =>
    console.log(`CORS|CSRF enabled, mevn is listening on ${CONF.origin}`)
);
