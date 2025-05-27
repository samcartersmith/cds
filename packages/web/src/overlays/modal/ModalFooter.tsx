import React from 'react';
import { css } from '@linaria/core';
import { useModalContext } from '@cbhq/cds-common/overlays/ModalContext';

import { Button, ButtonBaseProps } from '../../buttons/Button';
import type { BoxDefaultElement, BoxProps } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { breakpoints } from '../../styles/media';

const baseStyle = css`
  & > button,
  a {
    flex: none;
  }
  flex-direction: column-reverse;

  @media (min-width: ${breakpoints.phoneLandscape}px) {
    flex-direction: row;
    & > button,
    a {
      flex: 1;
    }
  }

  @media (min-width: ${breakpoints.tabletLandscape}px) {
    flex-direction: row;
    & > button,
    a {
      flex: initial;
    }
  }
`;

type ModalFooterBaseProps = {
  /** Primary action button */
  primaryAction: NonNullable<
    React.ReactElement<ButtonBaseProps & { onClick?: React.MouseEventHandler }>
  >;
  /** Secondary action button */
  secondaryAction?: React.ReactElement<ButtonBaseProps & { onClick?: React.MouseEventHandler }>;
};
export type ModalFooterProps = ModalFooterBaseProps & BoxProps<BoxDefaultElement>;

export const ModalFooter = ({
  gap = 2,
  justifyContent = 'flex-end',
  paddingX = 3,
  paddingY = 2,
  width = '100%',
  primaryAction,
  secondaryAction,
  ...props
}: ModalFooterProps) => {
  const { hideDividers } = useModalContext();

  if (primaryAction.type !== Button || (secondaryAction && primaryAction.type !== Button)) {
    console.error('Modal footer actions need to be CDS Button component');

    return null;
  }

  return (
    <HStack
      borderedTop={!hideDividers}
      className={baseStyle}
      gap={gap}
      justifyContent={justifyContent}
      paddingX={paddingX}
      paddingY={paddingY}
      width={width}
      {...props}
    >
      {secondaryAction}
      {primaryAction}
    </HStack>
  );
};
