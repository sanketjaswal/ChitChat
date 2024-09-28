import { addMessage } from './../controller/message_controller';
import express from 'express';

export const messageRouter = express.Router();

messageRouter.post('/message', addMessage);
