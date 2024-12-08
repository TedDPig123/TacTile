import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';

// Create a new router for user-related routes
const userRouter = express.Router();

// Define the routes for user registration, login, and logout
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

export default userRouter;