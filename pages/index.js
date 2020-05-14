import Head from "next/head";
import classnames from "classnames";
import { Dialog, DialogOverlay } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import useSWR from "swr";

import Form from "../components/form";

import fetch from "../libs/fetch";

export default function Home() {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => {
    setShowDialog(false);
  };

  const { data: recommendations, error } = useSWR(
    "/api/recommendations",
    fetch
  );

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
          Hello and welcome to Culturally Irrelevant! This website is based on a
          podcast where four friends shared and discussed the unseen, unplayed,
          unread, and all-around overlooked in movies, video games, comic books
          and whatever else they could come up with.
        </p>

        <a className="button-recommend" href="/recommend">
          <button className="button">Submit a Recommendation</button>
        </a>

        {/* For learning, teaching, sharing and remembering. */}

        {error ? (
          <div className="card error grid">Failed to load recommendations</div>
        ) : null}

        {!recommendations && !error ? (
          <div className="card grid">Loading...</div>
        ) : null}

        {recommendations && !error ? (
          <div className="grid">
            {recommendations.map((r) => (
              <a
                key={r.id}
                href={r.URL}
                className={classnames("card", { official: r.Official })}
              >
                <h3>
                  {r.Recommendation}

                  {r.Year && ` (${r.Year} ${r.Medium})`}
                </h3>
                <p>
                  {r.Message && `"${r.Message}"`}
                  <em> - {r.Name}</em>
                </p>

                {r.Clip ? (
                  <audio className="audio" controls src={r.Clip[0].url}>
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                ) : null}
              </a>
            ))}
          </div>
        ) : null}
      </main>

      <footer>Built with ♥ by Michael Knepprath</footer>

      <DialogOverlay
        style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
        isOpen={showDialog}
        onDismiss={close}
      >
        <Dialog
          aria-label="Form for submitting a recommendation"
          isOpen={showDialog}
          onDismiss={close}
          style={{ borderRadius: 10, border: "4px solid #000000" }}
        >
          <button className="button-close pull-right" onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </button>

          <h2>Submit a Recommendation</h2>
          <p>
            Please share your favorite unseen, unplayed, unread, and all-around
            overlooked in movies, video games, comic books, etc!{" "}
          </p>

          <Form />
        </Dialog>
      </DialogOverlay>

      <button className="fab button" onClick={open}>
        Submit a Recommendation
      </button>

      <style jsx>{`
        .fab {
          display: none;
          position: fixed;
          bottom: 32px;
          right: 32px;
        }
        @media (min-width: 600px) {
          .fab {
            display: block;
          }
        }

        .button-recommend {
          display: block;
        }
        @media (min-width: 600px) {
          .button-recommend {
            display: none;
          }
        }

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
        }
        .button:hover,
        .button:focus,
        .button:active {
          background-color: #ffe234;
          box-shadow: 16px 16px 0 rgba(0, 0, 0, 1);
          transform: translate(0, -2px);
        }

        .button-close {
          border: none;
          cursor: pointer;
          font-size: 3rem;
          font-weight: 500;
          line-height: 0.8rem;
          transition: 0.15s ease;
        }
        .button-close:hover,
        .button-close:focus,
        .button-close:active {
          color: #a90116;
          transform: translate(0, -2px);
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
          padding: 3rem 0;
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

        .ci-logo {
          background-color: #a90117;
          border-radius: 10px;
          height: 288px;
          margin-bottom: 48px;
          object-fit: contain;
          width: 288px;
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
          gap: 1rem;
          grid-template-columns: 1fr;

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
          border: 4px solid #a90117;
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
          text-shadow: 0 0.15rem 0 rgba(0, 0, 0, 1);
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .error {
          background-color: #a90116;
          color: #ffffff;
        }

        .audio {
          margin-top: 1rem;
          width: 100%;
        }

        .logo {
          height: 1em;
        }

        @media (min-width: 600px) {
          .grid {
            gap: 1.5rem;
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
