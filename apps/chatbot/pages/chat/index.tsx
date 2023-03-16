import { createChat, parseHost } from '@chatbot/api-client';
import styles from './index.module.css';
import { parseBody } from '../../utils/parse-body';
import { io } from 'socket.io-client';
import { useEffect, useRef } from 'react';
import { BOT_SERVER } from '../../constants';

/* eslint-disable-next-line */
export interface ChatProps {
  chat: Record<string, unknown>;
  botServer: string;
}

export function Chat(props: ChatProps) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (window) {
      socketRef.current = io(props.botServer);

      // client-side
      socketRef.current.on('connect', () => {
        console.log('connect', socketRef.current.id); // x8WIv7-mJelg7on_ALbx
      });

      socketRef.current.on('disconnect', () => {
        console.log('disconnect', socketRef.current.id); // undefined
      });
    }
  }, [props.botServer]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Chat!</h1>
      <code>{JSON.stringify(props)}</code>
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
