// userModel.js
const db = require("../../db/connection");
const bcrypt = require("bcrypt");

const User = {
  async createUser(firstname, lastname, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *";
    const values = [firstname, lastname, email, hashedPassword];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async findUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // You may add more methods for updating, deleting, or finding users based on your needs
};

module.exports = User;
