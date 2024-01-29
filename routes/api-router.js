const authRouter = require("./auth-router");

const apiRouter = require("express").Router();

/* apiRouter.post("/", (req, res) => {
  console.log("request object: ", req.body);
  res.status(200).send({ msg: `all done ${req.body.name}` });
}); */
apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
