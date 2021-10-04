const express = require("express");
const route = express.Router();

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

//! EXAMPLE
//? Specific middleware always in array![]
const upload = require("../app/middleware/multerMiddleware");

//? Controller
const restControllerMongo = require("../app/controllers/example/restControllerMongo");

//? Entry with prefix '/api'
route.get("/", restControllerMongo.multipurpose);

//? Endpoint
route.get("/node", restControllerMongo.fetchAllPost);
route.get("/node/:id", restControllerMongo.fetchPostByID);
route.post("/node", [upload], restControllerMongo.createPost);
route.patch("/node/:id", [upload], restControllerMongo.updatePost);
route.delete("/node/:id", restControllerMongo.deletePost);

module.exports = route;
