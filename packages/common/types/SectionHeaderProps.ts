import { ReactNode } from 'react';
import { UiIconName } from '@cbhq/cds-icons';

import { SharedAccessibilityProps } from './SharedAccessibilityProps';
import { SharedProps } from './SharedProps';
import { SpacingProps } from './SpacingProps';

export type SectionHeaderProps = {
  /** Text or ReactNode to be displayed in Title */
  title: ReactNode;
  /* ReactNode (icon, asset, image, etc) to display before title. */
  start?: ReactNode;
  /* Icon or ReactNode to display after title. */
  icon?: Exclude<ReactNode, 'string'> | UiIconName;
  /** ReactNode or UiIconName to present balances wherever it is necessary */
  balance?: ReactNode;
  /** ReactNode to display up to 2 lines of copy that frames the section's purpose and relevance */
  description?: ReactNode;
  /* ReactNode to display at the end */
  end?: ReactNode;
} & SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  SpacingProps;
