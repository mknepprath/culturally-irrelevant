import Head from "next/head";
import classnames from "classnames";
import useSWR from "swr";

import Button from "../components/button";
import FloatingActionButton from "../components/fab";
import Footer from "../components/footer";
import InternalLink from "../components/internal-link";
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
          <InternalLink href="/" isDarkMode={isDarkMode}>
            Go Home
          </InternalLink>
        </div>

        <img
          className={classnames(styles.ciGang, { [styles.dark]: isDarkMode })}
          src="/gang.jpg"
        />

        <h1 className="title">The Irrelevant Mixtape</h1>

        <p className="description">
          The Culturally Irrelevant highlight reel, including recommendations
          and other fun hijinks.
        </p>

        {!clips ? (
          <div
            className={classnames(styles.message, {
              [styles.dark]: isDarkMode,
            })}
          >
            Loading...
          </div>
        ) : null}

        {clips ? (
          <div className={styles.player}>
            <Player clips={clips} />
          </div>
        ) : null}
      </main>

      <Footer isDarkMode={isDarkMode} />

      <FloatingActionButton className={styles.darkModeSwitch} top>
        <Button
          isDarkMode={isDarkMode}
          onClick={() => setIsDarkMode((isDarkMode) => !isDarkMode)}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </FloatingActionButton>
    </div>
  );
}
