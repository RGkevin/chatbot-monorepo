import {
  ChatModel,
  createChat,
  MessageModel,
  parseHost,
} from '@chatbot/api-client';
import styles from './index.module.css';
import { parseBody } from '../../utils/parse-body';
import { io } from 'socket.io-client';
import { useEffect, useRef, useCallback, useState } from 'react';
import { BOT_SERVER } from '../../constants';

/* eslint-disable-next-line */
export interface ChatProps {
  chat: Record<string, unknown>;
  botServer: string;
}

export function Chat(props: ChatProps) {
  const socketRef = useRef(null);
  const messages = useState<MessageModel[]>([]);
  const chatModel = ChatModel.fromPlain(props.chat);

  const startAction = useCallback(() => {
    socketRef.current.emit('start', chatModel.toPlain());
  }, [chatModel]);

  const onServerMsg = useCallback((plainMsg: Record<string, unknown>) => {
    const serverMsg = MessageModel.fromPlain(plainMsg);

    console.log('server message: ', serverMsg);
  }, []);

  const sendMsgAction = useCallback(
    (content: string) => {
      const newMessage = MessageModel.fromPlain({
        content,
        userId: chatModel.userId,
        chatId: chatModel.id,
      });

      // business logic here

      // send message to bot server
      socketRef.current.emit('client:msg', newMessage.toPlain());
    },
    [chatModel.id, chatModel.userId]
  );

  useEffect(() => {
    if (window) {
      socketRef.current = io(props.botServer);

      // client-side
      socketRef.current.on('connect', () => {
        console.log('on:connect', socketRef.current.id);

        // start
        startAction();
      });

      socketRef.current.on('disconnect', () => {
        console.log('disconnect', socketRef.current.id); // undefined
      });

      // set handler
      socketRef.current.on('server:msg', onServerMsg);
    }
  }, [onServerMsg, props.botServer, startAction]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Chat!</h1>
      <code>{JSON.stringify(props)}</code>
      <ul>
        <li>messages</li>
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const host = parseHost(context.req);
  const formJson = await parseBody(context.req);
  const name = formJson['name'];
  const newChat = await createChat(host + '/bot-api', name);
  // if (context.req.method !== 'POST') {}

  return {
    props: {
      chat: newChat.toPlain(),
      botServer: BOT_SERVER,
    },
  };
}

export default Chat;
