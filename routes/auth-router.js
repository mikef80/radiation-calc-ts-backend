const authRouter = require("express").Router();

authRouter.post("/signup", (req, res) => {
  console.log('signup');
  res.status(200).send({ msg: "200 code" });
});



module.exports = authRouter;
