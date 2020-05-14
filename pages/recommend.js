import Head from "next/head";

import Form from "../components/form";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - Submit a Recommendation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <a className="button-home" href="/">
          <button className="button">Go Home</button>
        </a>

        <h1 className="title">Submit a Recommendation</h1>

        <p className="description">
          Please share your favorite unseen, unplayed, unread, and all-around
          overlooked in movies, video games, comic books, etc!
        </p>

        <Form />
      </main>

      <footer>Built with ♥ by Michael Knepprath</footer>

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
          transition: 0.15s ease;
          width: 100%;
        }
        .button:hover,
        .button:focus,
        .button:active {
          background-color: #ffe234;
          box-shadow: 16px 16px 0 rgba(0, 0, 0, 1);
          transform: translate(0, -2px);
        }

        .button-home {
          margin-bottom: 24px;
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
