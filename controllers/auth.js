const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const secret = "jsfnsdfbjsd";


exports.registerUser = async (req, res, next) => {

    try {

        const { email, phone, password, priority } = req.body;

        const existing_user = await User.findOne({ phone });

        if (existing_user) {
            return res.status(400).json({
                message: "User already registered"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            phone,
            priority,
            password: securePassword,
        })
        await newUser.save();
        res.status(200).json({
            status: 'success',
            message: "User registered successfully"
        })

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: "Something went wrong!",
        })
    }
}


exports.loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const existing_user = await User.findOne({ email });

        if (!existing_user) {
            res.status(404).json({
                status: 'error',
                message: "User not found"
            })
        }


        const passwordCompare = await bcrypt.compare(password, existing_user.password);
    
        if (!passwordCompare) {
            res.status(401).json({
                status: 'error',
                message: "Invalid credentials"
            })
        }
       

        const token = jwt.sign({ id: existing_user._id }, secret, { expiresIn: '1h' });
        res.status(200).json({
            status: 'success',
            message: "User logged in successfully",
            authToken: token
        })


    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: "Something went wrong!"
        })
    }
}


exports.protect = async(req, res, next) => {
    
}