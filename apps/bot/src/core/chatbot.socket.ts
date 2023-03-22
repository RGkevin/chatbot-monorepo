import { Socket, Server } from 'socket.io';
import {
  ChatModel,
  findUserById,
  MessageModel,
  UserModel,
} from '@chatbot/api-client';
import http from 'http';
import process from 'process';
import { ChatBotService } from './chatbot.service';
import { messagesStore } from '../store';
import { API_SERVER } from '../constants';
import { ChatbotCore } from './chatbotCore';

export class ChatBotSocket {
  constructor(io: Server, httpServer: http.Server) {
    this.io = io;
    this.httpServer = httpServer;
    // this.service = new ChatBotService();

    // this.setup();
  }

  private cores: Record<string, ChatbotCore> = {};
  // private service: ChatBotService;
  public httpServer: http.Server;
  public io: Server;
  // public chat?: ChatModel;
  // public user?: UserModel;
  // public socket?: Socket;

  listen() {
    this.httpServer.listen(process.env.PORT || 5001, () => {
      console.log('listening on *:', process.env.PORT || 5001);
    });

    this.io.on('connection', this.onConnection.bind(this));
  }

  deleteCore(room: string) {
    if (this.cores[room]) {
      this.cores[room].props.socket.disconnect();
      delete this.cores[room];
    }
    console.log(
      'ChatbotSocket.deleteCore room: ',
      room,
      Object.keys(this.cores)
    );
  }
  async onConnection(socket: Socket) {
    console.log('ChatBotSocket.onConnection.auth', socket.handshake.auth);

    // setup socket core
    try {
      const socketCore = await this.setupCore(socket);

      if (this.cores[socketCore.props.chat.room]) {
        console.warn(
          `ChatBotSocket.onConnection core for room $\{socketCore.props.chat.room} already exists, will reset`
        );
        this.deleteCore(socketCore.props.chat.room);
      }

      this.cores[socketCore.props.chat.room] = socketCore;

      // init core
      this.cores[socketCore.props.chat.room].props.socket.on(
        'disconnect',
        this.deleteCore.bind(this, socketCore.props.chat.room)
      );
      await this.cores[socketCore.props.chat.room].init();
    } catch (e) {
      console.error('ChatBotSocket.onConnect ERROR', e);
      socket.disconnect();
    }
  }

  async setupCore(socket: Socket): Promise<ChatbotCore> {
    const chat = ChatModel.fromPlain(JSON.parse(socket.handshake.auth.token));

    if (!socket.rooms.has(chat.room)) {
      const user = await findUserById(API_SERVER, chat.userId);

      return new ChatbotCore({
        socket,
        chat,
        user,
        io: this.io,
      });
    } else {
      throw new Error(
        `ChatBotSocket.join socket ${socket.id} already in room ${chat.room}`
      );
    }
  }

  async onSocketDisconnect(some) {
    console.log('onSocketDisconnect', some);
  }
}
