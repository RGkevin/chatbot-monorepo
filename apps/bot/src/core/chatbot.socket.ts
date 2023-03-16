import { Server } from 'socket.io';
import { ChatModel, MessageModel } from '@chatbot/api-client';

export interface ChatBotSocketProps {
  chat: ChatModel;
  socket: Server;
  onServerMsg: (msg: MessageModel) => void;
}
export class ChatBotSocket {
  private chat: ChatModel;
  private socket: Server;
  private onServerMsg: (msg: MessageModel) => void;

  constructor({ socket, chat, onServerMsg }: ChatBotSocketProps) {
    this.chat = chat;
    this.socket = socket;
    this.onServerMsg = onServerMsg;
  }

  sendMsg(msg: MessageModel) {
    console.log('sendMsg', msg);
  }

  disconnect() {
    this.socket.disconnectSockets();
  }
}
