const express = require("express");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

const apiRouter = require("./routes/api-router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/api", apiRouter);

/* const corsOptions = { origin: "http://locahost:9090" };

app.use(cors(corsOptions));
app.use("/api", apiRouter); */

module.exports = app;
