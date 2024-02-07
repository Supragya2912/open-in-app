const express = require('express');
const router = express.Router();
const  User = require('../controllers/UserController');
const Auth = require('../controllers/auth');

router.post('/register',Auth.registerUser);
router.post('/login',Auth.loginUser);





module.exports = router;