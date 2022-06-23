import React from 'react';
import { HeadingType, Props } from '@theme/Heading';
import Heading from '@theme-init/Heading';
import type { SpacingProps } from '@cbhq/cds-web';
import {
  TextBody,
  TextDisplay1,
  TextDisplay2,
  TextHeadline,
  TextTitle1,
} from '@cbhq/cds-web/typography';

import { TOKENS } from './tokens';

const headingMap = {
  h1: TextDisplay1,
  h2: TextDisplay2,
  h3: TextTitle1,
  h4: TextHeadline,
  h5: TextBody,
  h6: TextBody,
} as const;

export const MainHeading = ({ as, children }: Props) => {
  const Text = headingMap[as] as React.ComponentType<{ as?: HeadingType } & SpacingProps>;
  return <Text spacingBottom={TOKENS.docItem.spacingVertical}>{children}</Text>;
};
export default Heading;
