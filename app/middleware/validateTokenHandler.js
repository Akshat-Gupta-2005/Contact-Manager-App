const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('Not authorized, token failed');
            }

            console.log(decoded); // Now this will be printed correctly
            req.user = decoded.user;  // Store decoded info (e.g., user id) for downstream use
            next();              // Move to next middleware 
        });

        if (!token) {
            res.status(401);
            throw new Error('Not authorized or no token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = validateToken;
