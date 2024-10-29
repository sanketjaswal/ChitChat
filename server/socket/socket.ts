import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
// import cors from 'cors';
import Colors from 'colors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(Colors.green('a user connected'), socket.id);

  //join room
  socket.on('join_room', (data) => {
    socket.join(data);
  });

  //leave room
  socket.on('leave_room', (data) => {
    socket.leave(data);
  });

  // send message to room
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(Colors.red('User disconnected'), socket.id);
  });
});

export { app, io, server };
