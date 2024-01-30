const { signup, login } = require("../api/controllers/auth-controller");

const authRouter = require("express").Router();

/* authRouter.get("/login", (req, res) => {
  res.status(200).send({ msg: "200 code" });
}); */

authRouter.post("/signup", signup);
authRouter.post("/login", login);

module.exports = authRouter;
