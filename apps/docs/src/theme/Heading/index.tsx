import React from 'react';
import Link from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { cx } from '@linaria/core';
import type { Props } from '@theme/Heading';
import { Text } from '@cbhq/cds-web2';

import styles from './styles.module.css';

// Map heading levels to font props
const headingFontMap = {
  h1: 'display1',
  h2: 'display2',
  h3: 'title2',
  h4: 'title3',
  h5: 'title4',
  h6: 'headline',
} as const;

export default function Heading({ as: Component, id, ...props }: Props): React.ReactNode {
  const brokenLinks = useBrokenLinks();
  const {
    navbar: { hideOnScroll },
  } = useThemeConfig();

  const font = headingFontMap[Component] ?? 'body';

  // H1 headings do not need an id because they don't appear in the TOC.
  if (Component === 'h1' || !id) {
    return (
      <Component {...props} id={undefined}>
        <Text as="span" display="inline-block" font={font}>
          {props.children}
        </Text>
      </Component>
    );
  }

  brokenLinks.collectAnchor(id);

  const anchorTitle = translate(
    {
      id: 'theme.common.headingLinkTitle',
      message: 'Direct link to {heading}',
      description: 'Title for link to heading',
    },
    {
      heading: typeof props.children === 'string' ? props.children : id,
    },
  );

  return (
    <Component
      {...props}
      className={cx(
        'anchor',
        hideOnScroll ? styles.anchorWithHideOnScrollNavbar : styles.anchorWithStickyNavbar,
        props.className,
      )}
      id={id}
    >
      <Text as="span" display="inline-block" font={font}>
        {props.children}
      </Text>
      <Link aria-label={anchorTitle} className="hash-link" title={anchorTitle} to={`#${id}`}>
        &#8203;
      </Link>
    </Component>
  );
}
