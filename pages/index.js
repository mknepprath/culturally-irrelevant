import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import useSWR from "swr";

import Button from "../components/button";
import ButtonLink from "../components/button-link";
import Card from "../components/card";
import Dialog from "../components/dialog";
import FloatingActionButton from "../components/fab";
import Form from "../components/form";

import fetcher from "../libs/fetch";

import styles from "./index.module.css";

export default function Home({ theme }) {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [isDarkMode, setIsDarkMode] = theme;

  const { data: recommendations, error } = useSWR(
    "/api/recommendations",
    fetcher
  );

  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - Recommendations Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/mixtape">
          <img
            className={classnames(styles.logo, { [styles.dark]: isDarkMode })}
            src="/logo.png"
          />
        </Link>

        <h1 className="title">Recommendation Board</h1>

        <p className="description">
          Hello and welcome to Culturally Irrelevant! This website is based on a
          podcast where four friends shared and discussed the unseen, unplayed,
          unread, and all-around overlooked in movies, video games, comic books
          and whatever else they could come up with.
        </p>

        <p className="description">
          Please share your recommendations with us!
        </p>

        <ButtonLink
          className={styles.recommendLink}
          href="/recommend"
          isDarkMode={isDarkMode}
        >
          Submit a Recommendation
        </ButtonLink>

        {/* For learning, teaching, sharing and remembering. */}

        {error ? (
          <div className={classnames(styles.card, styles.grid, styles.error)}>
            Failed to load recommendations
          </div>
        ) : null}

        {!recommendations && !error ? (
          <div className={classnames(styles.card, styles.grid)}>Loading...</div>
        ) : null}

        {recommendations && !error ? (
          <div className={styles.grid}>
            {recommendations.map((rec) => (
              <Card
                clip={rec.clip}
                isDarkMode={isDarkMode}
                key={rec.id}
                medium={rec.medium}
                message={rec.message}
                name={rec.name}
                isOfficial={rec.isOfficial}
                recommendation={rec.recommendation}
                url={rec.url}
                year={rec.year}
              />
            ))}
          </div>
        ) : null}
      </main>

      <footer className={classnames({ dark: isDarkMode })}>
        Built with ♥ by Michael Knepprath
      </footer>

      <Dialog
        aria-label="Form for submitting a recommendation"
        close={close}
        isDarkMode={isDarkMode}
        showDialog={showDialog}
      >
        <h2 className={styles.h2}>Submit a Recommendation</h2>
        <p>
          Please share your favorite unseen, unplayed, unread, and all-around
          overlooked in movies, video games, comic books, etc!{" "}
        </p>

        <Form isDarkMode={isDarkMode} />
      </Dialog>

      <FloatingActionButton>
        <Button isDarkMode={isDarkMode} onClick={open}>
          Submit a Recommendation
        </Button>
      </FloatingActionButton>

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
