// Loose types for the vendored Reach UI dialog in `reach-dialog.js`.
import type { ComponentType } from "react";

export const Dialog: ComponentType<any>;
export const DialogOverlay: ComponentType<any>;
export function createDialogContext(
  rootComponentName: string,
  defaultContext?: any
): any;
