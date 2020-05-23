import classnames from "classnames";

import styles from "./button.module.css";

export default function Button({ children, className, isDarkMode, ...props }) {
  return (
    <button
      className={classnames(
        styles.button,
        { [styles.dark]: isDarkMode },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
