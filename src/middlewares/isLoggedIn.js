import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import dotenv from 'dotenv';
dotenv.config()

export const isLoggedIn = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided.' });
    }
    
    try {
        const tokenPart = token.split(' ')
        const decoded = jwt.verify(tokenPart[1], process.env.Secret);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized  User not found.' });
        }
        console.log(user);
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized - Invalid token.' });
    }
};
