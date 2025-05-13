const asyncHandler = require('express-async-handler');
//@desc Register new user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    // Registration logic here
    res.status(201).json({ message: 'User registered successfully' });
})

//@desc Login user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
    // Login logic here
    res.status(200).json({ message: 'User logged in successfully' });
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