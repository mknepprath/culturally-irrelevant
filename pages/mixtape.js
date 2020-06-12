import Head from "next/head";
import classnames from "classnames";
import useSWR from "swr";

import Button from "../components/button";
import FloatingActionButton from "../components/fab";
import Footer from "../components/footer";
import InternalLink from "../components/internal-link";
import Player from "../components/player";

import { LOADING_MESSAGES } from "../libs/constants";
import fetcher from "../libs/fetch";
import shuffle from "../libs/shuffle";

import styles from "./mixtape.module.css";

export default function Mixtape({ theme }) {
  const { data: clips } = useSWR("/api/player-clips", fetcher);

  const [isDarkMode, setIsDarkMode] = theme;

  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - The Irrelevant Mixtape</title>
        <meta
          name="description"
          content="The Culturally Irrelevant highlight reel, including recommendations
          and other fun hijinks."
        />
      </Head>

      <main>
        <div className={styles.buttonWrapper}>
          <InternalLink href="/" isDarkMode={isDarkMode}>
            Go Home
          </InternalLink>
        </div>

        <img
          alt="Tyler, Ben, Josh, and Dane, the hosts of Culturally Irrelevant"
          className={classnames(styles.ciGang, { [styles.dark]: isDarkMode })}
          src="/gang.jpg"
        />

        <h1 className="title">The Irrelevant Mixtape</h1>

        <p className="description">
          Hit play to listen to highlights from the Culturally Irrelevant
          podcast, including recommendations and other fun hijinks. A special
          thanks to{" "}
          <a
            href="https://roccow.bandcamp.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            RoccoW
          </a>{" "}
          for providing our{" "}
          <a
            href="https://soundcloud.com/roccow/break-a-leg"
            rel="noopener noreferrer"
            target="_blank"
          >
            theme music
          </a>
          .
        </p>

        {!clips ? (
          <div
            className={classnames(styles.message, {
              [styles.dark]: isDarkMode,
            })}
            suppressHydrationWarning
          >
            {shuffle(LOADING_MESSAGES)[0]}
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
