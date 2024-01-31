const { signup, login } = require("../api/controllers/auth-controller");

const authRouter = require("express").Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);

module.exports = authRouter;
