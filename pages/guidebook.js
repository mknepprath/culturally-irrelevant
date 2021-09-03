import Head from "next/head";
import classnames from "classnames";

import Button from "../components/button";
import FloatingActionButton from "../components/fab";
import InternalLink from "../components/internal-link";

import ButtonGuide from "../components/guidebook/button";
import CardGuide from "../components/guidebook/card";
import DarkModeGuide from "../components/guidebook/dark-mode";
import InternalLinkGuide from "../components/guidebook/internal-link";
import LoaderGuide from "../components/guidebook/loader";
import SearchBarGuide from "../components/guidebook/search-bar";

import styles from "./guidebook.module.css";

export default function Guidebook({ theme }) {
  const [isDarkMode, setIsDarkMode] = theme;

  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - The Reviewer's Guidebook</title>
        <meta
          name="description"
          content="A walk-through of the components used to build culturallyirrelevant.net"
        />
        <meta
          property="og:title"
          content="Culturally Irrelevant - The Reviewer's Guidebook"
        />
      </Head>

      <main style={{ alignItems: "start", justifyContent: "start" }}>
        <div className={styles.buttonWrapper} data-cy="guidebook-page">
          <InternalLink href="/" isDarkMode={isDarkMode}>
            Go Home
          </InternalLink>
        </div>

        <h1 className="title">The Guidebook</h1>

        <p className="description">
          Culturally Irrelevant's component library.
        </p>

        <DarkModeGuide>
          <Button
            isDarkMode={isDarkMode}
            onClick={() => setIsDarkMode((isDarkMode) => !isDarkMode)}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </DarkModeGuide>

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <CardGuide />

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <ButtonGuide />

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <LoaderGuide />

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <InternalLinkGuide />

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <SearchBarGuide />

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <p>
          Be sure to check out the 404 page to see the random recommendation
          displayed there:
        </p>

        <InternalLink href="/404">404 page</InternalLink>

        <p>Thanks for visiting Culturally Irrelevant! 😄</p>
        <p>- Michael</p>
      </main>

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
