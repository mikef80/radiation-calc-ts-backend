const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db/connection");

exports.signupUser = async (email) => {
  const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
};
