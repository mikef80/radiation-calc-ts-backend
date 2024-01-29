const authRouter = require("express").Router();

authRouter.get("/login", (req, res) => {
  res.status(200).send({ msg: "200 code" });
});

module.exports = authRouter;
