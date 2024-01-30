const { signupUser, loginUser } = require("../models/auth-models");

exports.signup = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  signupUser({ firstname, lastname, email, password })
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      res.status(err.status).send({ msg: err.msg });
    });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  loginUser({ email, password })
    .then((token) => {
      res.status(200).send({ msg: "Login successful", token });
    })
    .catch((err) => {
      res.status(err.status).send({ msg: err.msg });
    });
};
