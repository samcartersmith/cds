import { ReactNode } from 'react';

import { BoxBackgroundProps, PositionStyles } from './BoxBaseProps';
import { SharedProps } from './SharedProps';

export type PageHeaderBaseProps = {
  /**
   * Optional. Accepts a ReactNode. Used for placing primary content on the left side of the page header, such as a header title, logo, or icon button.
   */
  start?: ReactNode;
  /**
   * Optional. Accepts a ReactNode. Intended for content on the right side of the header, such as action buttons or icons.
   * In modal usage, elements like a close button should be included to facilitate modal dismissal.
   */
  end?: ReactNode;
  /**
   * Optional. Accepts a ReactNode. Intended for main title within the Page Header or for secondary content in the center of the header, like a navigation stepper or search bar.
   */
  title?: ReactNode;
} & SharedProps &
  PositionStyles &
  Pick<BoxBackgroundProps, 'background'>;

export type PageFooterBaseProps = {
  /**
   * Required. Accepts a ReactNode. Intended for content on the right side of the footer, such as action buttons or icons. */
  action: ReactNode;
} & SharedProps &
  PositionStyles &
  Pick<BoxBackgroundProps, 'background'>;
