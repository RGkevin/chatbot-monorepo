import styles from './chat-ui.module.css';
import { ChatModel, MessageModel } from '@chatbot/api-client';
import { Socket } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';

export interface ChatUIProps {
  chat: ChatModel;
  socket: Socket;
}

export function ChatUI({ socket, chat }: ChatUIProps) {
  const [content, setContent] = useState('');
  const setContentEvent = useCallback(
    (event) => setContent(event.target.value),
    []
  );

  const [messages, setMessages] = useState<MessageModel[]>([]);

  const onFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const newMessage = MessageModel.fromPlain({
        content,
        userId: chat.userId,
        chatId: chat.id,
      });

      // business logic here

      // send message to bot server
      socket.emit('user:msg', newMessage.toPlain());

      // save local
      setMessages([...messages, newMessage]);

      // clear text input
      setContent('');
    },
    [chat.id, chat.userId, content, messages, socket]
  );

  const onServerMsg = useCallback(
    (plainMsg: Record<string, unknown>) => {
      const serverMsg = MessageModel.fromPlain(plainMsg);
      console.log('onServerMsg.msg', serverMsg);

      setMessages([...messages, serverMsg]);
    },
    [messages]
  );

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('on:connect', socket.id);

        // start
        socket.emit('setup:room', chat.toPlain());
      });

      socket.on('disconnect', () => {
        console.log('on:disconnect', socket.id);
      });

      // set server msg handler
      socket.on('server:msg', onServerMsg);
    }
  }, [chat, onServerMsg, socket]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to ChatUI!</h1>
      <ul>
        {messages.map((msg, i) => (
          <li
            key={i}
            style={{
              backgroundColor: msg.isFromBot() ? 'black' : 'white',
              color: !msg.isFromBot() ? 'black' : 'white',
            }}
          >
            {msg.content}
          </li>
        ))}
      </ul>
      <form onSubmit={onFormSubmit}>
        <p>
          <label htmlFor="content">Message</label>
          <input
            type="text"
            value={content}
            onChange={setContentEvent}
            id="content"
            name="content"
          />
        </p>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatUI;
