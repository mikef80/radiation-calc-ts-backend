// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController'); // Adjust the path accordingly

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
