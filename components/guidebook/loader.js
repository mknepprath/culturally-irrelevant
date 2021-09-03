import React from "react";
import classnames from "classnames";

import { LOADING_RECOMMENDATIONS } from "../../libs/constants";
import shuffle from "../../libs/shuffle";

import styles from "./loader.module.css";

function LoaderGuide() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <>
      <h2>Loader</h2>

      <p>
        This is a candidate for promotion in this system. The loading message is
        random and is meant to be fun and on-brand for the podcast. Some are
        in-jokes for dedicated listeners.
      </p>

      <div
        className={classnames(styles.message, {
          [styles.dark]: isDarkMode,
        })}
        suppressHydrationWarning
      >
        {shuffle(LOADING_RECOMMENDATIONS)[0]}
      </div>

      <form
        style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}
      >
        <label>
          <input
            type="checkbox"
            value={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          Dark Mode
        </label>
      </form>
    </>
  );
}

export default LoaderGuide;
