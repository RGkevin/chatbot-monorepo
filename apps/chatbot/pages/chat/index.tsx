import { createChat, parseHost } from '@chatbot/api-client';
import styles from './index.module.css';
import { parseBody } from '../../utils/parse-body';

/* eslint-disable-next-line */
export interface ChatProps {}

export function Chat(props: ChatProps) {
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
  const newChat = await createChat(host, name);
  // if (context.req.method === 'POST') {}

  return {
    props: {
      chat: newChat.toPlain(),
    },
  };
}

export default Chat;
