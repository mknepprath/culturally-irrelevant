import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import classnames from "classnames";

import styles from "./footer.module.css";

interface FooterProps extends ComponentPropsWithoutRef<"footer"> {
  isDarkMode?: boolean;
}

export default function Footer({
  className,
  isDarkMode,
  ...props
}: FooterProps) {
  return (
    <footer className={classnames({ dark: isDarkMode }, className)} {...props}>
      <p>
        <a
          href="https://mknepprath.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Built with ♥ by Michael Knepprath
        </a>
      </p>
      <p>&nbsp;&bull;&nbsp;</p>
      <p className={classnames(styles.link, { [styles.dark]: isDarkMode })}>
        <Link href="/about">
          In Memory of Dane Christenson
        </Link>
      </p>
    </footer>
  );
}
