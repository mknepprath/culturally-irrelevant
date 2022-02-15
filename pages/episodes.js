import Head from "next/head";

import InternalLink from "../components/internal-link";
import { EPISODES } from "../libs/constants";

export default function About({ theme }) {
  const [isDarkMode] = theme;

  return (
    <div className="container" data-cy="about-page">
      <Head>
        <title>Culturally Irrelevant - Episodes</title>
        <meta
          name="description"
          content="Culturally Irrelevant is a now-defunct podcast hosted by four friends
          who brought overlooked goodies in pop culture to share with each other
          and their listeners."
        />
        <meta property="og:title" content="Culturally Irrelevant - Episodes" />
      </Head>

      <main>
        {EPISODES?.map((data, index) => (
          <InternalLink
            key={data.episode}
            href={`/episode/${index + 1}`}
            isDarkMode={isDarkMode}
          >{`#${data.episode} - ${data.title}`}</InternalLink>
        ))}
      </main>
    </div>
  );
}
