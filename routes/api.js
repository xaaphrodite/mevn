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

//? Specific middleware always in array![]
const upload = require("../app/middleware/multerMiddleware");

//? Controller
const restControllerMongo = require("../app/controllers/example/restControllerMongo");

//? Entry with prefix '/api'
route.get("/", restControllerMongo.multipurpose);

//? Endpoint
route.get("/xphrdite", restControllerMongo.fetchAllPost);
route.get("/xphrdite/:id", restControllerMongo.fetchPostByID);
route.post("/xphrdite", [upload], restControllerMongo.createPost);
route.patch("/xphrdite/:id", [upload], restControllerMongo.updatePost);
route.delete("/xphrdite/:id", restControllerMongo.deletePost);

module.exports = route;
