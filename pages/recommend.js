import Head from "next/head";

import Footer from "../components/footer";
import Form from "../components/form";
import InternalLink from "../components/internal-link";

import styles from "./recommend.module.css";

export default function Recommend({ theme }) {
  const [isDarkMode] = theme;

  return (
    <div className="container" data-cy="recommend-page">
      <Head>
        <title>Culturally Irrelevant - Submit a Recommendation</title>
        <meta
          name="description"
          content="Please share your favorite unseen, unplayed, unread, and all-around
          overlooked in movies, video games, comic books, etc!"
        />
        <meta
          property="og:title"
          content="Culturally Irrelevant - Submit a Recommendation"
        />
      </Head>

      <main>
        <div className={styles.linkWrapper}>
          <InternalLink href="/" isDarkMode={isDarkMode}>
            Go Home
          </InternalLink>
        </div>

        <h1 className="title">Submit a Recommendation</h1>

        <p className="description">
          Please share your favorite unseen, unplayed, unread, and all-around
          overlooked in movies, video games, comic books, etc!
        </p>

        <Form isDarkMode={isDarkMode} />
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
