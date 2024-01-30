const { signupUser } = require("../models/auth-models");

exports.signup = async (req, res, next) => {
  const { email } = req.body;

  signupUser(email).then((user) => {
    res.status(200).send({ user });
  });
};
