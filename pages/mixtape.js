import Head from "next/head";
import classnames from "classnames";
import useSWR from "swr";

import Button from "../components/button";
import ButtonLink from "../components/button-link";
import FloatingActionButton from "../components/fab";
import Player from "../components/player";

import fetcher from "../libs/fetch";

import styles from "./mixtape.module.css";

export default function Mixtape({ theme }) {
  const { data: clips } = useSWR("/api/player-clips", fetcher);

  const [isDarkMode, setIsDarkMode] = theme;

  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - The Irrelevant Mixtape</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.buttonWrapper}>
          <ButtonLink href="/" isDarkMode={isDarkMode}>
            Go Home
          </ButtonLink>
        </div>

        <img
          className={classnames(styles.ciGang, { dark: isDarkMode })}
          src="/gang.jpg"
        />

        <h1 className="title">The Irrelevant Mixtape</h1>

        <p className="description">
          The Culturally Irrelevant highlight reel, including recommendations
          and other fun hijinks.
        </p>

        {clips ? (
          <div className={styles.player}>
            <Player clips={clips} />
          </div>
        ) : null}
      </main>

      <footer className={classnames({ dark: isDarkMode })}>
        Built with ♥ by Michael Knepprath
      </footer>

      <FloatingActionButton className={styles.darkModeSwitch} top>
        <Button
          isDarkMode={isDarkMode}
          onClick={() => setIsDarkMode((isDarkMode) => !isDarkMode)}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </FloatingActionButton>

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
