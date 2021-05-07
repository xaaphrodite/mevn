const express = require("express");
const route = express.Router();
const restController = require("../app/controllers/restController");

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Middleware
const upload = require("../app/middleware/multerMiddleware");

// Entry with prefix '/api/mevn'
route.get("/", restController.multipurpose);

// Endpoint
route.get("/mevn", restController.fetchAllPost);
route.get("/mevn/:id", restController.fetchPostByID);
route.post("/mevn", upload, restController.createPost);
route.patch("/mevn/:id", upload, restController.updatePost);
route.delete("/mevn/:id", restController.deletePost);

module.exports = route;
