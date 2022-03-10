export type SharedAccessibilityProps = {
  /**
   * Accessibility label describing the control.
   * If no accessibilityLabel, it will set it to label
   * Maps to `aria-label`
   * */
  accessibilityLabel?: string;
  /** Accessibility hint for assisted devices when focused.
   * Message should indicate the purpose of the control.
   * If not supplied, will default to label */
  accessibilityHint?: string;
  /**
   * Accessibility prop that describes the component that labels it by its `id`
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute
   */
  accessibilityLabelledBy?: string;
  /** Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
};
