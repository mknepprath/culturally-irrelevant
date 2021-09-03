import React from "react";

import Button from "./../button";

function DarkModeGuide({ children }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <>
      <h2>Dark Mode</h2>

      <p>
        If a visitor has dark mode activated at the system level, I am making
        the assumption that this indicates visitor intent, unlike during light
        mode (which is the default mode). Because of this, the Dark Mode button
        is hidden when system dark mode is enabled. This also allows the
        activation of dark mode on non-iOS devices.
        <br />
        The implementation of Dark Mode was very purposeful, and not necessarily
        a 1:1 color-swap. This is especially clear for the red/purple cards
        which gain an outline in dark mode. The outline is added around the link
        arrow, as well.
      </p>

      {children}
    </>
  );
}

export default DarkModeGuide;
