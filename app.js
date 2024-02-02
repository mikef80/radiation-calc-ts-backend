const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./passport"); // Adjust the path accordingly
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes setup
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

module.exports = app;
