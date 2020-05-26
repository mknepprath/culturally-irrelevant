import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import useSWR from "swr";

import Button from "../components/button";
import Card from "../components/card";
import Dialog from "../components/dialog";
import FloatingActionButton from "../components/fab";
import Footer from "../components/footer";
import Form from "../components/form";
import InternalLink from "../components/internal-link";

import { LOADING_RECOMMENDATIONS } from "../libs/constants";
import fetcher from "../libs/fetch";
import shuffle from "../libs/shuffle";

import styles from "./index.module.css";

export default function Home({ theme }) {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [filter, setFilter] = React.useState("");

  const [numberOfCards, setNumberOfCards] = React.useState(16);

  const [isDarkMode, setIsDarkMode] = theme;

  const { data: recommendations, error } = useSWR(
    "/api/recommendations",
    fetcher
  );

  const filteredRecommendations = recommendations
    ? recommendations.filter((rec) =>
        [rec.name, rec.medium, rec.recommendation, rec.year]
          .join(" ")
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    : [];

  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - Recommendations Board</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Hello and welcome to Culturally Irrelevant! This website is based on a
          podcast where four friends shared and discussed the unseen, unplayed,
          unread, and all-around overlooked in movies, video games, comic books
          and whatever else they could come up with."
        />
      </Head>

      <main>
        <Link href="/mixtape">
          <img
            alt="Culturally Irrelevant logo"
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

        {/* For learning, teaching, sharing and remembering. */}

        <InternalLink href="/mixtape" isDarkMode={isDarkMode}>
          Listen to the Mixtape
        </InternalLink>

        <p className="description">
          The podcast may be over but we still have plenty to share. Please
          share your recommendations with us, as well!
        </p>

        <InternalLink
          className={styles.recommendLink}
          href="/recommend"
          isDarkMode={isDarkMode}
        >
          Submit a Recommendation
        </InternalLink>

        {error ? (
          <div
            className={classnames(styles.message, styles.error, {
              [styles.dark]: isDarkMode,
            })}
          >
            Failed to load recommendations
          </div>
        ) : null}

        {!recommendations && !error ? (
          <div
            className={classnames(styles.message, {
              [styles.dark]: isDarkMode,
            })}
          >
            {shuffle(LOADING_RECOMMENDATIONS)[0]}
          </div>
        ) : null}

        {recommendations && !error ? (
          <>
            <div className={styles.filter}>
              <input
                className={styles.filterInput}
                onChange={(event) => setFilter(event.currentTarget.value)}
                placeholder="Search"
              />
              {recommendations.length !== filteredRecommendations.length && (
                <p className={styles.filterCount}>{`${
                  filteredRecommendations.length
                } result${filteredRecommendations.length !== 1 ? "s" : ""}`}</p>
              )}
            </div>

            <div className={styles.grid}>
              {filteredRecommendations.slice(0, numberOfCards).map((rec) => (
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

            {filteredRecommendations.length > numberOfCards ? (
              <Button
                isDarkMode={isDarkMode}
                onClick={() =>
                  setNumberOfCards((numberOfCards) => numberOfCards + 32)
                }
              >
                Load More
              </Button>
            ) : null}
          </>
        ) : null}
      </main>

      <Footer isDarkMode={isDarkMode} />

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
    </div>
  );
}
