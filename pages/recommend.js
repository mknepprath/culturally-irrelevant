import Head from "next/head";
import classnames from "classnames";

import Form from "../components/form";
import ButtonLink from "../components/button-link";

import styles from "./recommend.module.css";

export default function Recommend({ theme }) {
  const [isDarkMode] = theme;

  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - Submit a Recommendation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.buttonWrapper}>
          <ButtonLink href="/" isDarkMode={isDarkMode}>
            Go Home
          </ButtonLink>
        </div>

        <h1 className="title">Submit a Recommendation</h1>

        <p className="description">
          Please share your favorite unseen, unplayed, unread, and all-around
          overlooked in movies, video games, comic books, etc!
        </p>

        <Form isDarkMode={isDarkMode} />
      </main>

      <footer className={classnames({ dark: isDarkMode })}>
        Built with ♥ by Michael Knepprath
      </footer>

      <style jsx global>{`
        html,
        body {
          background-color: ${isDarkMode ? "#1f1a19" : "inherit"};
          color: ${isDarkMode ? "#E5E5E5" : "inherit"};
        }
        @media (prefers-color-scheme: dark) {
          html,
          body {
            background-color: #1f1a19;
            color: #e5e5e6;
          }
        }
      `}</style>
    </div>
  );
}
