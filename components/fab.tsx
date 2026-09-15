import type { ComponentPropsWithoutRef } from "react";
import classnames from "classnames";

import styles from "./fab.module.css";

interface FloatingActionButtonProps extends ComponentPropsWithoutRef<"div"> {
  top?: boolean;
}

export default function FloatingActionButton({
  children,
  className,
  top,
  ...props
}: FloatingActionButtonProps) {
  return (
    <div
      className={classnames(styles.fab, { [styles.top]: top }, className)}
      {...props}
    >
      {children}
    </div>
  );
}
