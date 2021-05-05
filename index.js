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

// Required
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Express
const app = express();
const HOST = process.env.SERVER_HOST || "localhost";
const PORT = process.env.SERVER_PORT || 8000;
const URL = `${HOST}:${PORT}`;

// Config
app.use((request, response, next) => {
    console.log(`${request.method} ${request.protocol}://${URL}${request.url}`);
    next();
})
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(__dirname + "/public"))
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
        console.log("Go Ahead..");
    })
    .catch((error) => {
        console.log(error);
    });

// Server listen
app.listen(PORT, () =>
    console.log(`mevn server is running on http://${URL}`)
);
