const express = require('express');
const { registerUser, loginUser } = require('../Controller/authController');
const { route } = require('./students');
const router = express.Router();

// Middleware for parsing JSON
router.use(express.json());

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;