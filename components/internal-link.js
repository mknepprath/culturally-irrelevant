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
