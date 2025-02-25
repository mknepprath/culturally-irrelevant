import Head from "next/head";
import classnames from "classnames";
import useSWR from "swr";

import Button from "../components/button";
import FloatingActionButton from "../components/fab";
import Footer from "../components/footer";
import InternalLink from "../components/internal-link";

import fetcher from "../libs/fetch";
import randomInteger from "../libs/random-integer";

import styles from "./about.module.css";

export default function About({ theme }) {
  const { data: recommendations, error } = useSWR(
    "/api/recommendations",
    fetcher
  );

  const [isDarkMode, setIsDarkMode] = theme;

  const podcastRecommendations = recommendations
    ? recommendations.filter((rec) => rec.isOfficial)
    : [];
  const index = randomInteger(0, podcastRecommendations.length);
  const recommendationString = podcastRecommendations.length
    ? `, like that time
  ${podcastRecommendations[index].name.split(" ")[0]} brought
  ${podcastRecommendations[index].recommendation}`
    : "";

  return (
    <div className="container" data-cy="about-page">
      <Head>
        <title>Culturally Irrelevant - About the Irrelevant Podcast</title>
        <meta
          name="description"
          content="Culturally Irrelevant is a now-defunct podcast hosted by four friends
          who brought overlooked goodies in pop culture to share with each other
          and their listeners."
        />
        <meta
          property="og:title"
          content="Culturally Irrelevant - About the Irrelevant Podcast"
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

        <h1 className="title">About the Podcast</h1>

        <p className="description">
          {`We are Culturally Irrelevant, a now-defunct podcast hosted by four friends
          who shared overlooked goodies in pop culture with each other
          and our listeners${recommendationString}`}
          {recommendations ? (
            "."
          ) : (
            <>
              <span
                className={classnames(styles.dot1, {
                  [styles.dark]: isDarkMode,
                })}
              >
                .
              </span>
              <span
                className={classnames(styles.dot2, {
                  [styles.dark]: isDarkMode,
                })}
              >
                .
              </span>
              <span
                className={classnames(styles.dot3, {
                  [styles.dark]: isDarkMode,
                })}
              >
                .
              </span>
            </>
          )}
        </p>

        <InternalLink cypressattr="mixtape-link" href="/mixtape" isDarkMode={isDarkMode}>
          Listen to the Mixtape
        </InternalLink>

        <p className="description">
          In a typical episode, each host brought one movie or video game or
          comic book, etc, and gave a spoiler-free overview of it. At the end of
          the episode, the gang debated about which of them brought the most
          irrelevant topic, and which brought the most relevant.
        </p>

        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <img
              alt="Dane"
              className={classnames(styles.dane, { [styles.dark]: isDarkMode })}
              src="/tyler.jpg"
            />
            <p className="description">
              <b>
                <a
                  href="https://twitter.com/NerdAtWar"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Tyler Driscoll
                </a>
              </b>
              <br />
              Born in the cold of Michigan and shown Star Wars by his father;
              Tyler developed into a full-blown nerd. Star Wars, Marvel, and
              cinema galore. I'm Tyler.
            </p>
          </div>

          <div className={styles.gridItem}>
            <img
              alt="Dane"
              className={classnames(styles.dane, { [styles.dark]: isDarkMode })}
              src="/ben.jpg"
            />
            <p className="description">
              <b>
                <a
                  href="https://twitter.com/benlundsten"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ben Lundsten
                </a>
              </b>
              <br />A father of two future superheroes and a victim of male
              pattern baldness. His specialties are Halo 1 and films you've
              never heard of.
            </p>
          </div>

          <div className={styles.gridItem}>
            <img
              alt="Dane"
              className={classnames(styles.dane, { [styles.dark]: isDarkMode })}
              src="/josh.jpg"
            />
            <p className="description">
              <b>
                <a
                  href="https://twitter.com/JoshWWhat"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Josh Wierschke
                </a>
              </b>
              <br />
              Your friendly neighborhood Josh has been reading comics since
              before he could… well, read. But this nerd won't be put in a box.
            </p>
          </div>

          <div className={styles.gridItem}>
            <img
              alt="Dane"
              className={classnames(styles.dane, { [styles.dark]: isDarkMode })}
              src="/dane.jpg"
            />
            <p className="description">
              <b>
                <a
                  href="http://thirstycatcollection.blogspot.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Dane Christenson
                </a>
              </b>
              <br />
              An unapologetic Sega fanboy from WI who always roots for the
              underdog, making him the most irrelevant of the bunch. P.S.
              Stanley Kubrick.
            </p>
          </div>
        </div>

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <p className="description">
          In April 2020, we lost our friend and cohost, Dane, who filled every
          room he entered with joy and laughter. He loved long-forgotten movies
          and video games and was a driving force behind this podcast's
          existence. He also{" "}
          <a
            className={classnames(styles.link, { [styles.dark]: isDarkMode })}
            href="http://thirstycatcollection.blogspot.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            blogged
          </a>{" "}
          about things he was passionate about and enjoyed{" "}
          <a
            className={classnames(styles.link, { [styles.dark]: isDarkMode })}
            href="https://www.instagram.com/moon.beam.photo/"
            rel="noopener noreferrer"
            target="_blank"
          >
            photography
          </a>
          .
        </p>
        <img
          alt="Dane"
          className={classnames(styles.dane, { [styles.dark]: isDarkMode })}
          src="/dane.jpg"
        />
        <p className="description">We will miss him.</p>
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
