import { ChatModel, createChat, parseHost } from '@chatbot/api-client';
import styles from './index.module.css';
import { parseBody } from '../../utils/parse-body';
import { io, Socket } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';
import { BOT_SERVER } from '../../constants';
import ChatUI from '../../components/chats/chat-ui/chat-ui';

/* eslint-disable-next-line */
export interface ChatProps {
  plainChat: Record<string, unknown>;
  botServer: string;
}

export default function Chat({ botServer, plainChat }: ChatProps) {
  const chat = ChatModel.fromPlain(plainChat);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (window && !socket) {
      const newSocket = io(botServer, {
        auth: {
          // use chat model as auth token
          token: JSON.stringify(plainChat),
        },
      });
      setSocket(newSocket);
    }

    return () => {
      socket && socket.disconnect();
    };
  }, [botServer, plainChat, socket]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Chat!</h1>
      {socket && <ChatUI chat={chat} socket={socket} />}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  if (req.method !== 'POST') {
    res.redirect('/');
  }

  const formJson = await parseBody(req);
  const name = formJson['name'];

  const host = parseHost(req);
  const newChat = await createChat(host + '/bot-api', name);
  console.log('newChat', newChat.toPlain());
  return {
    props: {
      plainChat: newChat.toPlain(),
      botServer: BOT_SERVER,
    },
  };
}
