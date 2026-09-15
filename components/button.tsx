import type { ComponentPropsWithoutRef } from "react";
import classnames from "classnames";

import styles from "./button.module.css";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  isDarkMode?: boolean;
}

export default function Button({
  children,
  className,
  isDarkMode,
  ...props
}: ButtonProps) {
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
