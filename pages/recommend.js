import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";

import Form from "../components/form";

export default function Recommend({ theme }) {
  const [isDarkMode] = theme;

  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - Submit a Recommendation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="button-wrapper">
          <Link href="/">
            <button className="button">Go Home</button>
          </Link>
        </div>

        <h1 className="title">Submit a Recommendation</h1>

        <p className="description">
          Please share your favorite unseen, unplayed, unread, and all-around
          overlooked in movies, video games, comic books, etc!
        </p>

        <Form />
      </main>

      <footer className={classnames({ dark: isDarkMode })}>
        Built with ♥ by Michael Knepprath
      </footer>

      <style jsx>{`
        .button {
          background-color: #ffffff;
          border: 4px solid #000000;
          border-radius: 10px;
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 1);
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.75rem;
          width: 100%;
          transition: background-color 0.15s ease, box-shadow 0.15s ease,
            transform 0.15s ease;
        }
        .button.dark {
          color: #e5e5e5;
          background-color: #1f1a19;
        }
        @media (prefers-color-scheme: dark) {
          .button {
            color: #e5e5e5;
            background-color: #1f1a19;
          }
        }
        .button:hover,
        .button:focus,
        .button:active {
          background-color: #ffe234;
          box-shadow: 16px 16px 0 rgba(0, 0, 0, 1);
          transform: translate(0, -2px);
        }
        .button.dark:hover,
        .button.dark:focus,
        .button.dark:active {
          background-color: #2f294f;
          box-shadow: 16px 16px 0 rgba(0, 0, 0, 1);
          transform: translate(0, -2px);
        }
        @media (prefers-color-scheme: dark) {
          .button:hover,
          .button:focus,
          .button:active {
            background-color: #2f294f;
            box-shadow: 16px 16px 0 rgba(0, 0, 0, 1);
            transform: translate(0, -2px);
          }
        }

        .button-wrapper {
          margin-bottom: 24px;
          max-width: 240px;
          width: 100%;
        }

        .pull-right {
          float: right;
        }

        .container {
          min-height: 100vh;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        @media (min-width: 600px) {
          .container {
            padding: 0 0.5rem;
          }
        }

        main {
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 800px;
        }
        @media (min-width: 600px) {
          main {
            padding: 5rem 0;
          }
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer.dark {
          border-top: 1px solid #312725;
        }
        @media (prefers-color-scheme: dark) {
          footer {
            border-top: 1px solid #312725;
          }
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
          font-size: 1.6rem;
        }
        @media (min-width: 600px) {
          .title {
            font-size: 4rem;
          }
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.2;
          font-size: 1.2rem;
        }
        @media (min-width: 600px) {
          .description {
            line-height: 1.4;
            font-size: 1.5rem;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          background-color: ${isDarkMode ? "#1f1a19" : "inherit"};
          color: ${isDarkMode ? "#E5E5E5" : "inherit"};
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #1f1a19;
            color: #e5e5e6;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
