import classnames from "classnames";

import styles from "./button.module.css";

export default function Button({ children, isDarkMode, ...props }) {
  return (
    <button
      className={classnames(styles.button, { [styles.dark]: isDarkMode })}
      {...props}
    >
      {children}
    </button>
  );
}
