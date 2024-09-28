import { messageRouter } from './../routes/message_routes';
import { conversationRouter } from './../routes/conversation_routes';
import { createConversationTable } from './../models/conversation_model';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { userRouter } from '../routes/auth_routes';
import colors from 'colors';

import { app, server } from '../socket/socket';
import { connectToPostgres } from '../db/connectToPostgres';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/messasges', messageRouter);

server.listen(PORT, () => {
  connectToPostgres();
  createConversationTable();
  console.log(colors.bold.bgBlue(` server running in port ${PORT} `));
});
