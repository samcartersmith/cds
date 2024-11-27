import React from 'react';
import { css } from '@linaria/core';
import { useModalParent } from '@cbhq/cds-common/overlays/ModalParentContext';
import type { ButtonBaseProps } from '@cbhq/cds-common/types/ButtonBaseProps';

import { Button } from '../../buttons/Button';
import type { PolymorphicBoxProps } from '../../layout/Box';
import { deviceMqs } from '../../layout/breakpoints';
import { HStack } from '../../layout/HStack';

export const baseStyle = css`
  @media only screen and (${deviceMqs.tablet}) {
    & > button, a: {
      flex: 1;
    }
  }

  @media only screen and (${deviceMqs.phone}) {
    & > button, a: {
      flex: 'none';
    }
    flex-direction: 'column-reverse',
    /* Set height for vertical Spacer */
    span:nth-child(2): {
      height: var(--space-2);
    }
  }
`;

type ModalFooterBaseProps = {
  /** Primary action button */
  primaryAction: NonNullable<
    React.ReactElement<ButtonBaseProps & { onPress?: React.MouseEventHandler }>
  >;
  /** Secondary action button */
  secondaryAction?: React.ReactElement<ButtonBaseProps & { onPress?: React.MouseEventHandler }>;
};
export type ModalFooterProps<AsComponent extends React.ElementType> = PolymorphicBoxProps<
  AsComponent,
  ModalFooterBaseProps
>;

export const ModalFooter = <AsComponent extends React.ElementType = 'div'>({
  gap = 2,
  justifyContent = 'flex-end',
  paddingX = 3,
  paddingY = 2,
  width = '100%',
  primaryAction,
  secondaryAction,
  ...props
}: ModalFooterProps<AsComponent>) => {
  const { hideDividers } = useModalParent();

  if (primaryAction.type !== Button || (secondaryAction && primaryAction.type !== Button)) {
    // eslint-disable-next-line no-console
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
