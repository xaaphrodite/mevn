const express = require("express");
const route = express.Router();

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//! CSRF
const csrfProtection = require("../app/middleware/csrfMiddleware");

//? Global middleware for web
route.use(csrfProtection, (request, response, next) => {
    response.cookie("saveMe", request.csrfToken());
    next();
});

//? Controller
const nodeController = require("../app/controllers/nodeController");

route.get("/", nodeController.index);

module.exports = route;
