// userController.js
const User = require('../models/user-model');
const passport = require('passport')

/* const UserController = {
  async register(req, res) {
    const { firstname,lastname,email,password } = req.body;

    try {
      const existingUser = await User.findUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = await User.createUser(firstname,lastname,email,password);
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // You can add more controller methods for login, logout, etc.
}; */

const UserController = {
  register(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/register',
      failureFlash: true
    })(req, res, next);
  },

  // You can add more controller methods for login, logout, etc.
};

module.exports = UserController;
