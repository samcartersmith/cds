import { ReactNode } from 'react';

import { IllustrationPictogramNames } from './IllustrationNames';

export type MultiContentModuleBaseProps = {
  /** Illustration pictogram name or ReacNode to be displayed at the start of an module */
  pictogram?: IllustrationPictogramNames | Exclude<ReactNode, 'string'>;
  /** ReactNode or Text to be displayed in TextTitle1 */
  title: ReactNode;
  /** ReactNode or Text to be displayed in TextBody to provide details about the module */
  description?: ReactNode;
  /** ReactNode to be displayed at the middle of the module */
  children?: ReactNode;
  /** Text to be displayed in Button or ReactNode to display as call to action */
  action?: ReactNode;
  /** A11y Label for action button and cannot be used when `action` is a React Element */
  actionAccessibilityLabel?: string;
  /** ReactNode to display at the end */
  end?: ReactNode;
};
