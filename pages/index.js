import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import { Dialog, DialogOverlay } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import useSWR from "swr";

import Form from "../components/form";

import fetcher from "../libs/fetch";

export default function Home({ theme }) {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [isDarkMode, setIsDarkMode] = theme;

  const { data: recommendations, error } = useSWR(
    "/api/recommendations",
    fetcher
  );

  return (
    <div className="container">
      <Head>
        <title>Culturally Irrelevant - Recommendations Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/mixtape">
          <img
            className={classnames("ci-logo", { dark: isDarkMode })}
            src="/logo.png"
          />
        </Link>

        <h1 className="title">Recommendation Board</h1>

        <p className="description">
          Hello and welcome to Culturally Irrelevant! This website is based on a
          podcast where four friends shared and discussed the unseen, unplayed,
          unread, and all-around overlooked in movies, video games, comic books
          and whatever else they could come up with.
        </p>

        <p className="description">
          Please share your recommendations with us!
        </p>

        <div className="button-recommend">
          <Link href="/recommend">
            <button className={classnames("button", { dark: isDarkMode })}>
              Submit a Recommendation
            </button>
          </Link>
        </div>

        {/* For learning, teaching, sharing and remembering. */}

        {error ? (
          <div className="card error grid">Failed to load recommendations</div>
        ) : null}

        {!recommendations && !error ? (
          <div className="card grid">Loading...</div>
        ) : null}

        {recommendations && !error ? (
          <div className="grid">
            {recommendations.map(
              ({
                clip,
                id,
                medium,
                message,
                name,
                official,
                recommendation,
                url,
                year,
              }) => (
                <a
                  key={id}
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={classnames("card", { official, dark: isDarkMode })}
                >
                  <h3>
                    {recommendation}
                    {year && ` (${year} ${medium})`}
                    {url && <span className="external-link"> ↗</span>}
                  </h3>

                  {clip ? (
                    <audio
                      className="audio"
                      controls
                      controlsList="nodownload"
                      // https://github.com/mknepprath/culturally-irrelevant/issues/3
                      // In Safari, clicking the play button also opens the containing link.
                      // This prevents event bubbling so that doesn't happen.
                      onClick={(event) => event.preventDefault()}
                      src={clip.url}
                    >
                      Your browser does not support the
                      <code>audio</code> element.
                    </audio>
                  ) : null}

                  <p>
                    {message && `"${message}"`}
                    <em> - {name}</em>
                  </p>
                </a>
              )
            )}
          </div>
        ) : null}
      </main>

      <footer className={classnames({ dark: isDarkMode })}>
        Built with ♥ by Michael Knepprath
      </footer>

      <DialogOverlay
        className={classnames("dialog-overlay", { dark: isDarkMode })}
        isOpen={showDialog}
        onDismiss={close}
      >
        <Dialog
          aria-label="Form for submitting a recommendation"
          className={classnames("dialog", { dark: isDarkMode })}
          isOpen={showDialog}
          onDismiss={close}
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

          <Form isDarkMode={isDarkMode} />
        </Dialog>
      </DialogOverlay>

      <button
        className={classnames("fab", "button", { dark: isDarkMode })}
        onClick={open}
      >
        Submit a Recommendation
      </button>

      <div className="fab-theme">
        <button
          className={classnames("button", { dark: isDarkMode })}
          onClick={() => setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode)}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

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

        .fab-theme {
          display: none;
          position: fixed;
          top: 32px;
          right: 32px;
        }
        @media (min-width: 600px) {
          .fab-theme {
            display: block;
          }
        }
        @media (prefers-color-scheme: dark) {
          .fab-theme {
            display: none;
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

        .button-close {
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 3rem;
          font-weight: 500;
          line-height: 0.8rem;
          transition: color 0.15s ease, transform 0.15s ease;
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
          padding: 4rem 0;
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
          transition: border-top 0.15s ease;
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

        .ci-logo {
          background-color: #a90117;
          border-radius: 10px;
          height: 288px;
          margin-bottom: 48px;
          object-fit: contain;
          cursor: pointer;
          width: 288px;
          transition: background-color 0.15s ease;
        }
        .ci-logo.dark {
          background-color: #312971;
        }
        @media (prefers-color-scheme: dark) {
          .ci-logo {
            background-color: #312971;
          }
        }

        .ci-logo:hover,
        .ci-logo:focus,
        .ci-logo:active {
          animation: shake 0.2s;
          animation-iteration-count: infinite;
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
          background-color: #ffffff;
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 1);
          transform: translate(0, 0);
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 4px solid #000000;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease,
            box-shadow 0.15s ease, transform 0.15s ease,
            background-color 0.15s ease;
        }
        .card.dark {
          background-color: #1f1a19;
        }
        @media (prefers-color-scheme: dark) {
          .card {
            background-color: #1f1a19;
          }
        }

        .card.official {
          background-color: #a90117;
          border: 4px solid #a90117;
          color: #ffffff;
          transition: border 0.15s ease;
        }
        .card.official.dark {
          background-color: #2d2d6f;
          border: 4px solid #000000;
        }
        @media (prefers-color-scheme: dark) {
          .card.official {
            background-color: #2d2d6f;
            border: 4px solid #000000;
          }
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

        .card .external-link {
          opacity: 1;
          transition: opacity 0.15s ease;
        }
        .card:hover .external-link,
        .card:focus .external-link,
        .card:active .external-link {
          opacity: 1;
        }
        @media (min-width: 600px) {
          .card .external-link {
            opacity: 0;
          }
        }

        .error {
          background-color: #a90116;
          color: #ffffff;
        }

        .audio {
          margin-bottom: 0.6rem;
          width: 100%;
        }

        .logo {
          height: 1em;
        }

        .player {
          margin-bottom: 40px;
        }

        @media (min-width: 600px) {
          .grid {
            gap: 1.5rem;
            grid-template-columns: 1fr 1fr;
          }
        }

        @keyframes shake {
          0% {
            transform: translate(1px, 1px) rotate(0deg);
          }
          10% {
            transform: translate(-1px, -1px) rotate(-1deg);
          }
          20% {
            transform: translate(-2px, 0px) rotate(1deg);
          }
          30% {
            transform: translate(2px, 2px) rotate(0deg);
          }
          40% {
            transform: translate(1px, -1px) rotate(1deg);
          }
          50% {
            transform: translate(-1px, 2px) rotate(-1deg);
          }
          60% {
            transform: translate(-2px, 1px) rotate(0deg);
          }
          70% {
            transform: translate(2px, 1px) rotate(-1deg);
          }
          80% {
            transform: translate(-1px, -1px) rotate(1deg);
          }
          90% {
            transform: translate(1px, 2px) rotate(0deg);
          }
          100% {
            transform: translate(1px, -2px) rotate(-1deg);
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

        .dialog-overlay {
          background-color: hsla(0, 100%, 100%, 0.9);
        }
        .dialog-overlay.dark {
          background-color: hsla(0, 100%, 0%, 0.9);
        }
        @media (prefers-color-scheme: dark) {
          .dialog-overlay {
            background-color: hsla(0, 100%, 0%, 0.9);
          }
        }

        .dialog {
          background-color: #ffffff;
          border-radius: 10px;
          border: 4px solid #000000;
        }
        .dialog.dark {
          background-color: #1f1a19;
        }
        @media (prefers-color-scheme: dark) {
          .dialog {
            background-color: #1f1a19;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
