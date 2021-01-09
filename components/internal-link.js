import Link from "next/link";
import classnames from "classnames";

import styles from "./link.module.css";

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
        data-cy={props.cypressAttr}
      >
        {children}
      </a>
    </Link>
  );
}
