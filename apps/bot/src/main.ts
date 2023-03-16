import { Server } from 'socket.io';
import http from 'http';
import { ChatBotSocket } from './core';

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
});

const chatBotSocket = new ChatBotSocket(io, httpServer);

chatBotSocket.listen();
