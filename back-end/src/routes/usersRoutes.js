import express from 'express';
import userController from '../controllers/usersController.js';

const userRouter = express.Router();

/// ROUTES FOR USERS ///

// POST request to register a new user
userRouter.post('/register', userController.user_register);

// POST request to login a user
userRouter.post('/login', userController.user_login);

export default userRouter;