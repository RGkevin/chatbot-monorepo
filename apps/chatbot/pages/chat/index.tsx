import styles from './index.module.css';

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

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const chat = { foo: 'bar' };

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      chat,
    },
  };
}
export default Chat;
