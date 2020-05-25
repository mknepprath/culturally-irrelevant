import classnames from "classnames";

import styles from "./footer.module.css";

export default function Footer({ className, isDarkMode, ...props }) {
  return (
    <footer className={classnames({ dark: isDarkMode }, className)} {...props}>
      <p>Built with ♥ by Michael Knepprath</p>
      <p className={classnames(styles.bullet, { [styles.dark]: isDarkMode })}>
        &nbsp;&bull;&nbsp;
      </p>
      <p>In Memory of Dane Christenson</p>
    </footer>
  );
}
