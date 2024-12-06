import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';

// Create a new router for user-related routes
const userRouter = express.Router();

// Define the routes for user registration and login
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

export default userRouter;