import React from "react";
import classnames from "classnames";

import styles from "./inline-loader.module.css";

function InlineLoaderGuide() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <>
      <h2>Inline Loader</h2>

      <p>
        There are multiple locations no this site where I'm displaying a random
        recommendation in inline text, so I needed to design an in-line loading
        indicator. Dancing ellipses did the trick
        <>
          <span
            className={classnames(styles.dot1, {
              [styles.dark]: isDarkMode,
            })}
          >
            .
          </span>
          <span
            className={classnames(styles.dot2, {
              [styles.dark]: isDarkMode,
            })}
          >
            .
          </span>
          <span
            className={classnames(styles.dot3, {
              [styles.dark]: isDarkMode,
            })}
          >
            .
          </span>
        </>
        <br />
        <p>You can find examples of this on the About page and the 404 page.</p>
      </p>

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

export default InlineLoaderGuide;
