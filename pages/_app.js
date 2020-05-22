import "@reach/dialog/styles.css";
import "../css/global.css";

import { THEME } from "../libs/constants";
import { getStoredItem, setStoredItem } from "../libs/storage";

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // On app load, get the previously saved theme if there is one.
  React.useEffect(() => setIsDarkMode(getStoredItem(THEME)?.isDarkMode), []);

  // When the theme changes, store it.
  React.useEffect(() => setStoredItem(THEME, { isDarkMode }), [isDarkMode]);

  return <Component {...pageProps} theme={[isDarkMode, setIsDarkMode]} />;
}

export default MyApp;
