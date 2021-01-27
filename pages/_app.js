import React from "react";

import "@reach/dialog/styles.css";
import "../css/global.css";

import { THEME } from "../libs/constants";
import { getStoredItem, setStoredItem } from "../libs/storage";

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // On app load, get the previously saved theme if there is one.
  React.useEffect(() => setIsDarkMode(getStoredItem(THEME)?.isDarkMode), []);

  // When the theme changes,
  React.useEffect(() => {
    // add `dark` class to the body,
    const body = document.querySelector("body");
    if (isDarkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
    // and store it.
    setStoredItem(THEME, { isDarkMode });
  }, [isDarkMode]);

  return <Component {...pageProps} theme={[isDarkMode, setIsDarkMode]} />;
}

export default MyApp;
