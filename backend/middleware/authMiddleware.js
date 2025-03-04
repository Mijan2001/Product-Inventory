import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded Token:', decoded);

            req.user = await User.findById(decoded?.id).select('-password');

            if (!req.user) {
                console.log('User ID from Token:', decoded.id);
                console.log('User not found in the database');
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            console.log('Authenticated User:', req.user);
            next();
        } catch (error) {
            console.error('JWT Verification Error:', error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    console.log('Admin Check:', req.user?.isAdmin);

    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin };
