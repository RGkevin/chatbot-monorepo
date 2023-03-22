import { Socket, Server } from 'socket.io';
import { ChatModel, MessageModel, UserModel } from '@chatbot/api-client';
import { messagesStore } from '../store';
import { ChatBotService } from './chatbot.service';

export interface ChatbotCoreProps {
  socket: Socket;
  io: Server;
  chat: ChatModel;
  user: UserModel;
}

export class ChatbotCore {
  constructor(props: ChatbotCoreProps) {
    this.props = props;
  }

  props: ChatbotCoreProps;

  async onUserMsg(plainMessage: Record<string, unknown>) {
    const userMsg = MessageModel.fromPlain(plainMessage);
    console.log('ChatBotSocket.onUserMsg', userMsg);

    // get Bot output
    const output = await ChatBotService.getOutput(
      userMsg,
      this.props.chat,
      this.props.user
    );
    await this.sendMsg(output);
  }

  async init() {
    console.log(
      `ChatbotCore.init user.name: ${this.props.user.name} room: ${this.props.chat.room}`
    );
    this.props.socket.on('user:msg', this.onUserMsg.bind(this));

    // join room
    this.props.socket.join(this.props.chat.room);

    // start conversation
    const greetingsGenerator = messagesStore[1];
    await this.sendMsg(
      greetingsGenerator.toContent({
        chat: this.props.chat,
        user: this.props.user,
      })
    );
  }

  async sendMsg(content: string) {
    const msgToSend = MessageModel.fromPlain({
      userId: this.props.chat.userId,
      chatId: this.props.chat.id,
      content,
    });
    console.log(
      `ChatbotCore.sendMsg: ${msgToSend.content} to: ${this.props.chat.room}`
    );

    this.props.io
      .to(this.props.chat.room)
      .emit('server:msg', msgToSend.toPlain());
  }
}
