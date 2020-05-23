import classnames from "classnames";

import styles from "./external-link.module.css";

export default function ExternalLink({
  children,
  className,
  isDarkMode,
  ...props
}) {
  return (
    <a
      className={classnames(
        styles.link,
        { [styles.dark]: isDarkMode },
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
