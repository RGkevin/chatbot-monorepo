import { Socket, Server } from 'socket.io';
import {
  ChatModel,
  findUserById,
  MessageModel,
  UserModel,
} from '@chatbot/api-client';
import http from 'http';
import process from 'process';

export class ChatBotSocket {
  constructor(io: Server, httpServer: http.Server) {
    this.io = io;
    this.httpServer = httpServer;

    this.setup();
  }

  public httpServer: http.Server;
  public io: Server;
  public chat?: ChatModel;
  public user?: UserModel;
  public socket?: Socket;

  listen() {
    this.httpServer.listen(process.env.PORT || 5001, () => {
      console.log('listening on *:', process.env.PORT || 5001);
    });
  }
  setup() {
    if (!this.socket) {
      this.io.on('connection', this.onConnection.bind(this));
    } else {
      console.log(
        `ChatBotSocket.setup socket ${this.socket} already connected`
      );
    }
  }

  onConnection(socket: Socket) {
    console.log('ChatBotSocket.onConnection');
    this.socket = socket;

    // setup socket events
    this.setupSocket();
  }

  setupSocket() {
    this.socket?.on('setup:room', this.onSetupRoom.bind(this));
    this.socket?.on('user:msg', this.onUserMsg.bind(this));
  }

  async onSetupRoom(plainChat) {
    // load and verify plainChat
    this.chat = ChatModel.fromPlain(plainChat);

    // join room
    if (!this.socket.rooms.has(this.chat.room)) {
      this.user = await findUserById(this.chat.userId);
      console.log('ChatBotSocket.onSetupRoom', this.user.name, this.chat.room);
      this.socket.join(this.chat.room);

      // init conversation
      await this.init();
    } else {
      console.log(
        `ChatBotSocket.join socket ${this.socket.id} already in room ${this.chat.room}`
      );
    }
  }
  onUserMsg(plainMessage: Record<string, unknown>) {
    const msg = MessageModel.fromPlain(plainMessage);
    console.log('ChatBotSocket.onUserMsg', msg);
  }

  async sendMsg(content: string) {
    const msgToSend = MessageModel.fromPlain({
      userId: this.chat.userId,
      chatId: this.chat.id,
      content,
    });

    this.io.to(this.chat.room).emit('server:msg', msgToSend.toPlain());
  }
  async init() {
    // start conversation
    await this.sendMsg(
      `Hi ${this.user.name}, welcome to this Chat! How can I help you?`
    );
  }

  disconnect() {
    this.socket.disconnect();
  }
}
