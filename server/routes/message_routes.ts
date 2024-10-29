import { addMessage, getMessages } from './../controller/message_controller';
import express from 'express';

export const messageRouter = express.Router();

messageRouter.post('/addmessage', addMessage);
messageRouter.get('/getmessages/:ids', getMessages);
