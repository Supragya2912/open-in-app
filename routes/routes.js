const express = require('express');
const router = express.Router();
const  User = require('../controllers/UserController');
const Auth = require('../controllers/auth');
const Task = require('../controllers/task');

router.post('/register',Auth.registerUser);
router.post('/login',Auth.loginUser);
router.post('/createTask',Auth.protect, Task.createTask); 

module.exports = router;