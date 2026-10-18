import type { ComponentPropsWithoutRef } from "react";
import classnames from "classnames";

import styles from "./link.module.css";

interface ExternalLinkProps extends ComponentPropsWithoutRef<"a"> {
  isDarkMode?: boolean;
}

export default function ExternalLink({
  children,
  className,
  isDarkMode,
  ...props
}: ExternalLinkProps) {
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
