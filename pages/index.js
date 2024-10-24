import React from "react";
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
import SearchBar from "../components/search-bar";

import { LOADING_RECOMMENDATIONS } from "../libs/constants";
import fetcher from "../libs/fetch";
import filterRecommendations from "../libs/filter";
import randomInteger from "../libs/random-integer";
import shuffle from "../libs/shuffle";

import styles from "./index.module.css";

export default function Home({ theme }) {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [numberOfCards, setNumberOfCards] = React.useState(16);

  const [isDarkMode, setIsDarkMode] = theme;

  const [filter, setFilter] = React.useState("");
  const { data: recommendations, error } = useSWR(
    "/api/recommendations",
    fetcher
  );
  const filteredRecommendations =
    filter.toLowerCase() === "surprise me"
      ? [recommendations[randomInteger(0, recommendations.length - 1)]]
      : filterRecommendations(filter, recommendations);

  return (
    <div className="container" data-cy="home-page">
      <Head>
        <title>Culturally Irrelevant - Recommendations Board</title>
        <meta
          name="description"
          content="Hello and welcome to Culturally Irrelevant! This website is based on a
          podcast where four friends shared and discussed the unseen, unplayed,
          unread, and all-around overlooked in movies, video games, comic books
          and whatever else they could come up with."
        />
        <meta
          property="og:title"
          content="Culturally Irrelevant - Recommendations Board"
        />
      </Head>

      <main>
        <Link href="/about">
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

        <InternalLink
          className={styles.aboutLink}
          cypressattr="about-link"
          href="/about"
          isDarkMode={isDarkMode}
        >
          About the Podcast
        </InternalLink>

        <p className="description">
          The podcast may be over but we still want to give you a platform for
          sharing your favorite overlooked goodies in pop culture. If you have a
          recommendation to share, please do! We'd love to check it out.
        </p>

        <Button
          className={styles.desktopRecommendLink}
          isDarkMode={isDarkMode}
          onClick={open}
        >
          Submit a Recommendation
        </Button>

        <InternalLink
          className={styles.mobileRecommendLink}
          href="/recommend"
          isDarkMode={isDarkMode}
        >
          Submit a Recommendation
        </InternalLink>

        <p className="description">
          All of the recommendations made on the Culturally Irrelevant podcast
          are highlighted in{" "}
          <span
            className={classnames(styles.highlightPurple, {
              [styles.dark]: isDarkMode,
            })}
          >
            purple
          </span>
          <span
            className={classnames(styles.highlightRed, {
              [styles.dark]: isDarkMode,
            })}
          >
            red
          </span>{" "}
          below.
        </p>

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
            suppressHydrationWarning
          >
            {shuffle(LOADING_RECOMMENDATIONS)[0]}
          </div>
        ) : null}

        {recommendations && !error ? (
          <>
            <SearchBar
              className={styles.filter}
              filter={filter}
              filteredRecommendations={filteredRecommendations}
              recommendations={recommendations}
              setFilter={setFilter}
            />

            {filteredRecommendations.length > 0 ? (
              <div className={styles.grid} data-cy="home-grid">
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
            ) : (
              <div
                className={classnames(styles.message, {
                  [styles.dark]: isDarkMode,
                })}
              >
                No results match this search
              </div>
            )}

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
