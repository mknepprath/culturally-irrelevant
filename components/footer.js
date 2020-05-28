import Link from "next/link";
import classnames from "classnames";

import styles from "./footer.module.css";

export default function Footer({ className, isDarkMode, ...props }) {
  return (
    <footer className={classnames({ dark: isDarkMode }, className)} {...props}>
      <p>
        <a href="https://mknepprath.com" target="_blank">
          Built with ♥ by Michael Knepprath
        </a>
      </p>
      <p>&nbsp;&bull;&nbsp;</p>
      <p className={classnames(styles.link, { [styles.dark]: isDarkMode })}>
        <Link href="/about">
          <a>In Memory of Dane Christenson</a>
        </Link>
      </p>
    </footer>
  );
}
