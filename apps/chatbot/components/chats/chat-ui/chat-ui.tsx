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

  const startAction = useCallback(() => {
    socket.emit('start', chat.toPlain());
  }, [chat, socket]);

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
      console.log('onserver', serverMsg);
      setMessages([...messages, serverMsg]);
    },
    [messages]
  );

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('on:connect', socket.id);

        // start
        startAction();
      });

      socket.on('disconnect', () => {
        console.log('disconnect', socket.id);
      });

      // set server msg handler
      socket.on('server:msg', onServerMsg);
    }
  }, [onServerMsg, socket, startAction]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to ChatUI!</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg.content}</li>
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
