import React, { useMemo } from 'react';
import { HeadingType, Props } from '@theme/Heading';
import Heading from '@theme-init/Heading';
import type { SpacingProps } from '@cbhq/cds-web';
import {
  TextBody,
  TextDisplay1,
  TextDisplay3,
  TextHeadline,
  TextProps,
  TextTitle4,
} from '@cbhq/cds-web/typography';

import slugify from '../utils/slugify';

import { TOKENS } from './tokens';

const headingMap = {
  h1: TextDisplay1,
  h2: TextDisplay3,
  h3: TextTitle4,
  h4: TextHeadline,
  h5: TextBody,
  h6: TextBody,
} as const;

const TextHeading = ({
  children,
  className,
  originalAs,
  ...rest
}: TextProps & { originalAs: HeadingType; className?: string }) => {
  const Text = headingMap[originalAs] as React.ComponentType<{ as?: HeadingType } & SpacingProps>;
  return (
    <Text as={originalAs} dangerouslySetClassName={className} {...rest}>
      {children}
    </Text>
  );
};

export const MainHeading = ({ as, children, id, ...rest }: Props & TextProps) => {
  const slug = useMemo(() => {
    if (id) return id;

    // transform text to slug for toc navigation
    if (typeof children === 'string') {
      return slugify(children);
    }

    return children;
  }, [children, id]);

  return (
    <Heading
      as={TextHeading}
      id={slug}
      originalAs={as}
      // only add spacing bottom for large headings
      spacingBottom={as === 'h1' || as === 'h2' ? TOKENS.docItem.spacingVertical : 0}
      {...rest}
    >
      {children}
    </Heading>
  );
};

export default MainHeading;
