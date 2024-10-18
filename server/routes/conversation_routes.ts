import express from 'express';
import { addConversation, getConversationIdByUserIds } from '../controller/conversation_controller';

export const conversationRouter = express.Router();

conversationRouter.post('/conversation', addConversation);

conversationRouter.get('/getConversationId/:ids', getConversationIdByUserIds);
