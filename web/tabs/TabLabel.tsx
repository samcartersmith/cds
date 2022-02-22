import { TabLabelProps as CommonTabLabelProps } from '@cbhq/cds-common';
import { css } from 'linaria';
import React, { useMemo, memo } from 'react';
import { TextHeadline, TextTitle3, TextTitle4 } from '../typography';
import { TextProps } from '../typography/TextProps';
import { spacing } from '../tokens';

export const tabLabelSpacingClassName = css`
  padding-top: ${spacing[2]};
  padding-bottom: calc(${spacing[2]} - 2px); // Account for the 2px TabIndicator
`;
const containerClassName = css`
  position: relative;
`;
const hiddenClassName = css`
  width: 100%;
  visibility: hidden;
  pointer-events: none;
  height: 0px;
`;

const COLORS = {
  primary: {
    active: 'primary',
    inactive: 'foreground',
  },
  secondary: {
    active: 'foreground',
    inactive: 'foregroundMuted',
  },
} as const;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export type TabLabelProps = CommonTabLabelProps & TextProps;

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const TabLabel = memo(({ id, active, variant = 'primary', ...props }: TabLabelProps) => {
  const color = useMemo(() => COLORS[variant][active ? 'active' : 'inactive'], [active, variant]);
  const TextElement = useMemo(() => {
    if (variant === 'primary') return TextHeadline;
    if (active) return TextTitle3;

    return TextTitle4;
  }, [active, variant]);

  return (
    <>
      {!active && variant !== 'primary' ? (
        <span className={containerClassName}>
          <TextElement as="h2" color={color} {...props} />
          {/* This element is used to ensure the element with doens't change when we change font-weight */}
          <TextTitle3
            as="h2"
            {...props}
            dangerouslySetClassName={hiddenClassName}
            aria-hidden="true"
          />
        </span>
      ) : (
        <TextElement
          as="h2"
          color={color}
          {...props}
          dangerouslySetClassName={variant === 'primary' ? tabLabelSpacingClassName : undefined}
        />
      )}
    </>
  );
});

TabLabel.displayName = 'TabLabel';
