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

            console.log(decoded);
            req.user = decoded.user;  // Store decoded info (e.g., user id) for downstream use
            /*req.user = decoded.user;
            adds a new user field to the req object.
            */
            next();
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
