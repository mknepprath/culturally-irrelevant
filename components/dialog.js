import classnames from "classnames";

import {
  Dialog as ReachDialog,
  DialogOverlay as ReachDialogOverlay,
} from "./reach-dialog";
import { VisuallyHidden } from "./reach-visually-hidden";

import styles from "./dialog.module.css";

export default function Dialog({
  children,
  close,
  isDarkMode,
  showDialog,
  ...props
}) {
  return (
    <ReachDialogOverlay
      className={classnames(styles.dialogOverlay, {
        [styles.dark]: isDarkMode,
      })}
      isOpen={showDialog}
      onDismiss={close}
    >
      <ReachDialog
        className={classnames(styles.dialog, { [styles.dark]: isDarkMode })}
        isOpen={showDialog}
        onDismiss={close}
        {...props}
      >
        {children}

        <button
          className={classnames(styles.closeDialogButton, {
            [styles.dark]: isDarkMode,
          })}
          onClick={close}
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
      </ReachDialog>
    </ReachDialogOverlay>
  );
}
