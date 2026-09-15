import type { ComponentProps } from "react";
import Link from "next/link";
import classnames from "classnames";

import styles from "./link.module.css";

type InternalLinkProps = ComponentProps<typeof Link> & {
  cypressattr?: string;
  isDarkMode?: boolean;
};

export default function InternalLink({
  children,
  className,
  isDarkMode,
  ...props
}: InternalLinkProps) {
  return (
    <Link
        className={classnames(
            styles.link,
            { [styles.dark]: isDarkMode },
            className
        )}
        data-cy={props.cypressattr}
        {...props}
    >
        {children}
    </Link>
  );
}
