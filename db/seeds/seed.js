const format = require("pg-format");
const db = require("../connection");

const seed = ({ userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users;`)

    .then(() => {
      const usersTablePromise = db.query(`
      CREATE TABLE users (
        id SERIAL,
        firstname VARCHAR NOT NULL,
        lastname VARCHAR NOT NULL,
        email VARCHAR PRIMARY KEY,
        hashed_password VARCHAR NOT NULL
      );`);

      return Promise.all([usersTablePromise]);
    })

    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users ( firstname, lastname, email, hashed_password) VALUES %L;",
        userData.map(({ firstname, lastname, email, hashed_password }) => [
          firstname,
          lastname,
          email,
          hashed_password,
        ])
      );
      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([usersPromise]);
    });
};

module.exports = seed;
