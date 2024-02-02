const UserController = require("../api/controllers/user-controller");

const apiRouter = require("express").Router();

apiRouter.post("/register", UserController.register);

module.exports = apiRouter;
