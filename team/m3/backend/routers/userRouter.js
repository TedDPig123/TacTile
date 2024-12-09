import express from 'express';
import { registerUser, loginUser, logoutUser, deleteUser } from '../controllers/userController.js';

// Create a new router for user-related routes
const userRouter = express.Router();

// Define the routes for user registration, login, and logout
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.delete('/delete', deleteUser);

export default userRouter;