import express from 'express';
import { listUsers, loginControl, registerControl, logoutControl } from '../controller/auth_controller';

export const userRouter = express.Router();

userRouter.post('/signup', registerControl);

userRouter.post('/login', loginControl);

userRouter.post('/logout', logoutControl);

userRouter.get('/', listUsers);

// module.exports = userRouter;
