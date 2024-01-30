const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../db/connection");

exports.signupUser = async ({ firstname, lastname, email, password }) => {
  try {
    // CHECK IF USER IS PRESENT
    const existingUser = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      console.log("user already exists");
      // IF PRESENT, REJECT PROMISE
      return Promise.reject({
        status: 400,
        msg: "Email already there, No need to register again.",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE NEW USER IN DATABASE
    const createdUser = await db
      .query(
        `INSERT INTO users 
        (firstname, lastname, email, hashed_password)
      VALUES
        ($1, $2, $3, $4)
      RETURNING firstname, lastname, email;`,
        [firstname, lastname, email, hashedPassword]
      )
      .then((res) => res.rows[0]);

    return createdUser;
  } catch (err) {
    console.error("Error creating user: ", err);
    return Promise.reject({
      status: 500,
      msg: "Database error while registering user!",
    });
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    // CHECK IF USER IS PRESENT
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (user.rows.length === 0) {
      console.log("user doesn't exist");
      // IF PRESENT, REJECT PROMISE
      return Promise.reject({
        status: 400,
        msg: "User doesn't exist",
      });
    }

    // COMPARE HASHED PASSWORDS
    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].hashed_password
    );

    if (!isPasswordValid) {
      return Promise.reject({ status: 401, msg: "Invalid password" });
    }

    // GENERATE JWT
    const token = jwt.sign(
      {
        userId: user.rows[0].id,
        email: user.rows[0].email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // SUCCESS
    return token;
  } catch (err) {
    console.error("Error during login:", err);
    return Promise.reject({ status: 500, msg: "Internal Server Error" });
  }
};
