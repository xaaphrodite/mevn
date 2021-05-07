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

// Configurations
const App = express();
const HOST = process.env.SERVER_HOST || "localhost";
const PORT = process.env.SERVER_PORT || 8000;
const URL = `${HOST}:${PORT}`;
const PATH = require("path");

// Production conditions
if (process.env.NODE_ENV === "production") {
    App.use("/", express.static(PATH.join(__dirname, "/dist"))).get(
        /.*/,
        (request, response) => {
            response.sendFile(PATH.join(__dirname, "/dist/index.html"));
        }
    );
}

App.use((request, response, next) => {
    console.log(`${request.method} ${request.protocol}://${URL}${request.url}`);
    next();
})
    .use(cors())
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
App.listen(PORT, () => console.log(`mevn is listening on http://${URL}`));
