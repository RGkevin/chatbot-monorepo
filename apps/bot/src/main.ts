import { Server } from 'socket.io';
import http from 'http';
import { ChatBotSocket } from './core';
import { CLIENT_SERVER } from './constants';

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_SERVER,
    methods: ['GET', 'POST'],
  },
});

const chatBotSocket = new ChatBotSocket(io, httpServer);

chatBotSocket.listen();
