import Head from "next/head";
import classnames from "classnames";
import useSWR from "swr";

import fetch from "../libs/fetch";

export default function Home() {
  const { data, error } = useSWR("/api/airtable", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const recommendations = data.reverse();

  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - Recommendations Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <img className="ci-logo" src="/logo.png" />

        <h1 className="title">Recommendation Board</h1>

        <p className="description">
          For learning, teaching, sharing and remembering.
        </p>

        <div className="grid">
          {recommendations.map((r) => (
            <a
              key={r.id}
              href={r.URL}
              className={classnames("card", { official: r.Official })}
            >
              <h3>
                {r.Recommendation}
                {r.Year && ` (${r.Year})`}
              </h3>
              <p>
                {r.Message} - {r.Name}
              </p>
            </a>
          ))}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <div className="fab">Submit a Recommendation</div>

      <style jsx>{`
        .fab {
          position: fixed;
          bottom: 32px;
          right: 32px;
          cursor: pointer;
          background-color: #ffffff;
          border: 4px solid #000000;
          border-radius: 10px;
          padding: 1.5rem;
          transition: color 0.15s ease, border-color 0.15s ease,
            box-shadow 0.15s ease, transform 0.15s ease;
        }

        .fab:hover,
        .fab:focus,
        .fab:active {
          box-shadow: 16px 16px 0 rgba(0, 0, 0, 1);
          transform: translate(0, -2px);
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .ci-logo {
          background-color: #a90117;
          border-radius: 10px;
          height: 300px;
          margin-bottom: 40px;
          object-fit: contain;
          width: 300px;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: grid;
          gap: 0.5rem;
          grid-template-columns: 1fr;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 1);
          transform: translate(0, 0);
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 4px solid #000000;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease,
            box-shadow 0.15s ease, transform 0.15s ease;
        }

        .card.official {
          background-color: #a90117;
          border: none;
          color: #ffffff;
        }

        .card:hover,
        .card:focus,
        .card:active {
          box-shadow: 16px 16px 0 rgba(0, 0, 0, 1);
          transform: translate(0, -2px);
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;

          text-shadow: 0 0 0 rgba(0, 0, 0, 0);
          transition: transform 0.15s ease;
        }

        .card:hover h3,
        .card:focus h3,
        .card:active h3 {
          transform: rotate(-2deg) scale(1.1) translate(10px, 0);
        }

        .card.official:hover h3,
        .card.official:focus h3,
        .card.official:active h3 {
          text-shadow: 0 4px 0 rgba(0, 0, 0, 1);
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (min-width: 600px) {
          .grid {
            gap: 24px;
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
