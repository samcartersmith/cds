export type SharedAccessibilityProps = {
  /**
   * Accessibility label describing the control.
   * If no accessibilityLabel, it will set it to label
   * */
  accessibilityLabel?: string;
  /** Accessibility hint for assisted devices when focused.
   * Message should indicate the purpose of the control.
   * If not supplied, will default to label */
  accessibilityHint?: string;
};
