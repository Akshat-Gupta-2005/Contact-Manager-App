const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc Register new user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        // return res.status(400).json({ message: 'All fields are required!' });
        res.status(400);
        throw new Error('All fields are required!');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
        });
    }

    console.log(user);
    // Registration logic here 
})

//@desc Login user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
    // Login logic here
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are required!');
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }

        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1m',
        });
        res.status(200).json({
            accessToken,
        });
    }else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
})

//@desc Current user info
//@route GET /api/users/current
//@access Private

const currentUser = asyncHandler(async (req, res) => {
    // Get current user logic here
    res.status(200).json({ message: 'Current user data' });
})


module.exports = {
    registerUser,
    loginUser,
    currentUser
}