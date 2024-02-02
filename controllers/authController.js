// authController.js
const passport = require('../passport'); // Adjust the path accordingly

exports.login = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
