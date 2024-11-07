import { IllustrationPictogramNames } from './IllustrationNames';

export type MultiContentModuleBaseProps = {
  /** Illustration pictogram name or ReacNode to be displayed at the start of an module */
  pictogram?: IllustrationPictogramNames | Exclude<React.ReactNode, 'string'>;
  /** ReactNode or Text to be displayed in TextTitle1 */
  title: React.ReactNode;
  /** ReactNode or Text to be displayed in TextBody to provide details about the module */
  description?: React.ReactNode;
  /** ReactNode to be displayed at the middle of the module */
  children?: React.ReactNode;
  /** Text to be displayed in Button or ReactNode to display as call to action */
  action?: React.ReactNode;
  /** A11y Label for action button and cannot be used when `action` is a React Element */
  actionAccessibilityLabel?: string;
  /** ReactNode to display at the end */
  end?: React.ReactNode;
};
