import styles from './index.module.css';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <h3>Start a new Chat</h3>
          <form action="/chat" method="post">
            <p>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" minLength={2} required />
            </p>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
