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
const restController = require("../app/controllers/restController");

//? Entry with prefix '/api/mevn'
route.get("/", restController.multipurpose);

//? Endpoint
route.get("/node", restController.fetchAllPost);
route.get("/node/:id", restController.fetchPostByID);
route.post("/node", [upload], restController.createPost);
route.patch("/node/:id", [upload], restController.updatePost);
route.delete("/node/:id", restController.deletePost);

module.exports = route;
