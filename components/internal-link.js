import Link from "next/link";
import classnames from "classnames";

import styles from "./internal-link.module.css";

export default function InternalLink({
  children,
  className,
  isDarkMode,
  ...props
}) {
  return (
    <Link {...props}>
      <a
        className={classnames(
          styles.link,
          { [styles.dark]: isDarkMode },
          className
        )}
      >
        {children}
      </a>
    </Link>
  );
}
