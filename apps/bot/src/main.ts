import { Server } from 'socket.io';
import http from 'http';
import * as process from 'process';

const chatBotServer = http.createServer();

const io = new Server(chatBotServer, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

chatBotServer.listen(process.env.PORT || 5001, () => {
  console.log('listening on *:', process.env.PORT || 5001);
});
