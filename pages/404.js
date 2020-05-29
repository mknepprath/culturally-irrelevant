import Link from "next/link";
import useSWR from "swr";

import randomInteger from "../libs/random-integer";

import fetcher from "../libs/fetch";
import styles from "./404.module.css";

export default function Custom404() {
  const { data: recommendations, error } = useSWR(
    "/api/recommendations",
    fetcher
  );

  let rec;

  if (recommendations) {
    const index = randomInteger(0, recommendations.length);
    rec = recommendations[index];
  }

  return (
    <>
      <Link href="/">
        <img
          alt="A photo of a broken robot, signifying the fact that you've reached a error page."
          className={styles.error}
          src="/error.jpg"
        />
      </Link>

      <div className={styles.content}>
        <h1>404 - Page Not Found</h1>
        {rec ? (
          <p>
            Have you checked out <a href={rec.url}>{rec.recommendation}</a> yet?
          </p>
        ) : (
          <>
            <span className={styles.dot1}>.</span>
            <span className={styles.dot2}>.</span>
            <span className={styles.dot3}>.</span>
          </>
        )}
      </div>
    </>
  );
}
