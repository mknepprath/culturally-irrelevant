import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import Card from "../../components/card";
import fetcher from "../../libs/fetch";
import styles from "../index.module.css";

export default function Episode({ theme }) {
  const { query } = useRouter();
  const [isDarkMode] = theme;
  const { data, error } = useSWR(
    () => query.id && `/api/episode/${query.id}`,
    fetcher
  );
  const { data: recommendations, error: recError } = useSWR(
    "/api/recommendations",
    fetcher
  );
  const episodeRecommendations = recommendations?.filter(
    (rec) => rec.episode === query.id
  );

  if (error) return <div>{error.message}</div>;
  if (recError) return <div>{recError.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container">
      <Head>
        <title>
          #{data.episode} - {data.name}
        </title>
        <meta property="og:title" content={`#${data.episode} - ${data.name}`} />
      </Head>

      <main>
        <Card
          clip={data.audio}
          isDarkMode={isDarkMode}
          medium="Episode"
          recommendation={`#${data.episode} - ${data.name}`}
          style={{ marginBottom: "1.5rem", width: "100%" }}
          year={data.date}
        />
        <div className={styles.grid} data-cy="home-grid">
          {episodeRecommendations?.map((rec) => (
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
      </main>
    </div>
  );
}
