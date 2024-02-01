const format = require("pg-format");
const db = require("../connection");

const seed = ({ userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS auth_user;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS user_session;`);
    })

    .then(() => {
      const usersTablePromise = db.query(`
      CREATE TABLE users (
        firstname VARCHAR NOT NULL,
        lastname VARCHAR NOT NULL,
        email VARCHAR PRIMARY KEY,
        password VARCHAR NOT NULL
      );`);

      const authUserTablePromise = db.query(`
      CREATE TABLE auth_user (
        id TEXT PRIMARY KEY
      );`);

      const userSessionTablePromise = db.query(`
      CREATE TABLE auth_user (
        id TEXT PRIMARY KEY
      );`);

      return Promise.all([
        usersTablePromise,
        authUserTablePromise,
        userSessionTablePromise,
      ]);
    })

    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users ( firstname, lastname, email, password) VALUES %L;",
        userData.map(({ firstname, lastname, email, password }) => [
          firstname,
          lastname,
          email,
          password,
        ])
      );
      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([usersPromise]);
    });
};

module.exports = seed;
