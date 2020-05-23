import classnames from "classnames";

import styles from "./fab.module.css";

export default function FloatingActionButton({
  children,
  className,
  top,
  ...props
}) {
  return (
    <div
      className={classnames(styles.fab, { [styles.top]: top }, className)}
      {...props}
    >
      {children}
    </div>
  );
}
