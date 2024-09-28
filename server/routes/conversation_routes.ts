import express from 'express';
import { addConversation } from '../controller/conversation_controller';
// import { createConversation } from '../models/conversation_model';

export const conversationRouter = express.Router();

conversationRouter.post('/conversation', addConversation);
