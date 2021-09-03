import React from "react";

import Button from "./../button";

function CardGuide() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <>
      <h2>Button</h2>

      <p>
        Buttons are flexible based on their content. They are bold, rounded, and
        cartoon-like to match the design of the rest of the site.
      </p>

      <Button
        isDarkMode={isDarkMode}
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </Button>

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
