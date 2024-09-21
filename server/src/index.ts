import dotenv from 'dotenv';
import express from 'express';
import { userRouter } from '../routes/auth_routes';
import colors from 'colors';

import { app, server } from '../socket/socket';
import { ConnectToPostgres } from '../db/connectToPostgres';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', userRouter);

server.listen(PORT, () => {
  ConnectToPostgres();
  console.log(colors.bold.bgBlue(` server running in port ${PORT} `));
});
