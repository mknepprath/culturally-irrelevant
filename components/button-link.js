import classnames from "classnames";

import styles from "./button-link.module.css";

export default function ButtonLink({
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
