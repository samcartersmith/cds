export type SharedProps = {
  /**
   * Used to locate this element in unit and end-to-end tests.
   * This prop follows the precedent set by React Native Web which uses a testID prop to emit a data-testid attribute on * the element
   */
  testID?: string;
};
