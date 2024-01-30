const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db/connection");

exports.signupUser = async ({ firstname, lastname, email, password }) => {
  const userExists = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (userExists.rows.length) {
    return Promise.reject({ reason: "User already exists" });
  }

  const createdUser = await db.query(
    `
  INSERT INTO users 
    (firstname, lastname, email, password)
  VALUES 
    ($1, $2, $3, $4)
  RETURNING *;
  `,
    [firstname, lastname, email, password]
  );

  return createdUser.rows[0];
};
