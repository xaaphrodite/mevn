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

// Middleware always in array![]
const csrfProtection = require("../app/middleware/csrfMiddleware");

// Global middleware
route.use(csrfProtection, (request, response, next) => {
    response.cookie("saveMe", request.csrfToken());
    next();
});

// Controller
const mevnController = require("../app/controllers/nodeController");

route.get("/", mevnController.index);

module.exports = route;
