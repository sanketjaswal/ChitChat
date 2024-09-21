import express from 'express';
import { listUsers, loginControl, registerControl } from '../controller/auth_controller';

export const userRouter = express.Router();

userRouter.post('/signup', registerControl);

userRouter.post('/login', loginControl);

userRouter.get('/', listUsers);

// module.exports = userRouter;
