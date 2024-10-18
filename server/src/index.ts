// import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import colors from 'colors';

import { app, server } from '../socket/socket';
import { connectToPostgres } from '../db/connectToPostgres';
import { userRouter } from '../routes/auth_routes';
import { participantRouter } from './../routes/participant_routes';
import { messageRouter } from './../routes/message_routes';
import { conversationRouter } from './../routes/conversation_routes';
import { createUserTable } from './../models/user_model';
import { createConversationTable } from './../models/conversation_model';
import { createPartipantsTable } from '../models/participant_model';
import { createMessageTable } from './../models/message_model';

// dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/participants', participantRouter);
app.use('/api/messages', messageRouter);

server.listen(PORT, () => {
  connectToPostgres();
  createUserTable();
  createConversationTable();
  createMessageTable();
  createPartipantsTable();
  console.log(colors.bold.bgBlue(` server running in port ${PORT}`));
});
