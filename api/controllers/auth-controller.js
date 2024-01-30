const { signupUser } = require("../models/auth-models");

exports.signup = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  signupUser({firstname, lastname, email, password}).then((user) => {
    res.status(200).send({ user });
  });
};
