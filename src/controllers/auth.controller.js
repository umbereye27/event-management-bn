import User from './../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { userValidations } from '../utils/validations';

export const userSignup = async (req,res,next)=>{
    const validationResult = userValidations().validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.details[0].message });
        }
    const { email, username, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export const userLogin = async (req, res) => {
    const validationResult = userValidations().validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ message: validationResult.error.details[0].message });
        }
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect username or password.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect username or password.' });
        }
        const token = jwt.sign({ email: user.email, username: user.username }, process.env.Secret);
        res.json({ token });
    } catch (error) {
        console.error('Error in user login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const updateUserRole = async (req, res) => {
    const { username, newRole } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        user.role = newRole;
        await user.save();
        res.status(200).json({ message: 'User role updated successfully.' });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};