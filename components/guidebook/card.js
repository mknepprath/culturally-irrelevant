import React from "react";

import Card from "./../card";

function CardGuide() {
  const [isOfficial, setIsOfficial] = React.useState(false);
  const [hasClip, setHasClip] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <>
      <h2>Card</h2>

      <p>
        This card is to be displayed in a grid. Each card contains a
        recommendation, along with details about that recommendation. If the
        card contains an item recommended on the podcast, it is highlighted and
        includes an audio clip and link to more details about it.
        <br />
        Hover to see the animated transition. I achieved a bold, animated feel
        by exaggerating shadows and adding a subtle rotation to the link arrow
        that appears at the top right for podcast recommendations.{" "}
      </p>

      <Card
        clip={hasClip ? "/blip-theme.mp3" : null}
        isDarkMode={isDarkMode}
        medium="Platform"
        message="I <3 Twitter!"
        name="Michael Knepprath"
        isOfficial={isOfficial}
        recommendation="Twitter"
        url={isOfficial ? "https://twitter.com/mknepprath" : null}
        year="2006"
      />

      <form
        style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}
      >
        <label>
          <input
            type="checkbox"
            value={isOfficial}
            onChange={() => setIsOfficial(!isOfficial)}
          />
          Podcast Recommendation
        </label>
        <label>
          <input
            type="checkbox"
            value={hasClip}
            onChange={() => setHasClip(!hasClip)}
          />
          Audio Clip
        </label>
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
