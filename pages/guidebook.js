import Head from "next/head";
import classnames from "classnames";

import Button from "../components/button";
import ExternalLink from "../components/external-link";
import FloatingActionButton from "../components/fab";
import InternalLink from "../components/internal-link";

import ButtonGuide from "../components/guidebook/button";
import CardGuide from "../components/guidebook/card";
import DarkModeGuide from "../components/guidebook/dark-mode";
import InlineLoaderGuide from "../components/guidebook/inline-loader";
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

        <InlineLoaderGuide />

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <InternalLinkGuide />

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <SearchBarGuide />

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <h2>404 Page</h2>
        <p>
          My favorite part of this page is that it also includes a dynamic
          random recommendation. Sort of to say, sorry about that! Here's a
          little treat. Clicking anywhere on the page takes you home.
        </p>

        <InternalLink href="/404" isDarkMode={isDarkMode}>
          404 page
        </InternalLink>

        <hr className={classnames(styles.hr, { [styles.dark]: isDarkMode })} />

        <p>
          Thanks for visiting Culturally Irrelevant! If you have suggestions,
          please open an issue on GitHub. 😄
        </p>
        <ExternalLink
          href="https://github.com/mknepprath/culturally-irrelevant/issues"
          rel="noopener noreferrer"
          target="_blank"
          isDarkMode={isDarkMode}
        >
          GitHub Issues
        </ExternalLink>
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
