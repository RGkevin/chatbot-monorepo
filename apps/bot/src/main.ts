import { Server } from 'socket.io';
import http from 'http';
import * as process from 'process';
import { ChatModel, MessageModel } from '@chatbot/api-client';
import { findUserById } from '../../../libs/api-client/src/auth/auth.service';

const chatBotServer = http.createServer();

const io = new Server(chatBotServer, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  let chatModel;
  console.log('on:connection');

  socket.on('start', async (plainChat) => {
    chatModel = ChatModel.fromPlain(plainChat);

    // join to room
    socket.join(chatModel.room);

    // load and verify plainChat
    const user = await findUserById(chatModel.userId);

    // TODO: bot logic here
    // start conversation
    const msgToSend = MessageModel.fromPlain({
      userId: chatModel.userId,
      chatId: chatModel.id,
      content: `Hi ${user.name}, welcome to this Chat! How can I help you?`,
    });

    // init bot
    io.to(chatModel.room).emit('server:msg', msgToSend.toPlain());
  });

  socket.on('user:msg', async (plainMessage) => {
    const msgModel = MessageModel.fromPlain(plainMessage);

    console.log('on:user:msg', msgModel.content, chatModel.room);
    // TODO temp response with the same message
    io.to(chatModel.room).emit('server:msg', plainMessage);
  });

  socket.on('disconnect', () => {
    console.log('on:disconnect');
  });
});

chatBotServer.listen(process.env.PORT || 5001, () => {
  console.log('listening on *:', process.env.PORT || 5001);
});
