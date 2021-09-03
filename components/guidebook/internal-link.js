import React from "react";

import InternalLink from "./../internal-link";

function CardGuide() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <>
      <h2>Internal Link</h2>

      <p>
        This internal link is a wrapper for <code>next/link</code>, which
        enables client-side transitions between routes.
      </p>

      <InternalLink href="/" isDarkMode={isDarkMode}>
        Go Home
      </InternalLink>

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

export default CardGuide;
