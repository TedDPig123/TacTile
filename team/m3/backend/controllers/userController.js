import SQLiteUser from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Helper function to create a response object
const factoryResponse = (status, message) => ({ status, message });

// Controller function to handle user registration
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await SQLiteUser.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(factoryResponse(500, 'User not created due to error'));
    }
};

// Controller function to handle user login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await SQLiteUser.getUserByEmail(email);
        if (!user) {
            return res.status(401).json(factoryResponse(401, 'Invalid email or password'));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(factoryResponse(401, 'Invalid email or password'));
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json(factoryResponse(500, 'Error logging in'));
    }
};

// POST: Controller function to handle user logout
export const logoutUser = (req, res) => {
    // Invalidate the token 
    res.status(200).json({ message: 'Logged out successfully' });
};