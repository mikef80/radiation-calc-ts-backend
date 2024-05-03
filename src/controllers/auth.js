const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("select user_id, email from users;");

    return res.status(200).send({ success: true, users: rows });
  } catch (error) {
    console.log(error.message);
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    await db.query("insert into users(email,password) values ($1,$2)", [
      email,
      hashedPassword,
    ]);

    return res
      .status(201)
      .send({ success: true, message: "The registration was successful" });
  } catch (error) {
    console.log(error.message);
    res.send(500).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  let user = req.user;
  let payload = { id: user.user_id, email: user.email };

  try {
    const token = sign(payload, SECRET);

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .send({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.log(error.message);
    res.send(500).send({ error: error.message });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).send({ info: "protected info" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", { httpOnly: true })
      .send({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    res.send(500).send({ error: error.message });
  }
};
