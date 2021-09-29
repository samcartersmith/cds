import React from 'react';
import { css } from 'linaria';
import { ModalFooterBaseProps } from '@cbhq/cds-common/types/ModalBaseProps';

import { HStack } from '../../layout';
import { spacing } from '../../tokens';
import { Button } from '../../buttons';

export type ModalFooterProps = ModalFooterBaseProps;

/** Button layout */
const stacked = `
  flex-direction: column-reverse;
  /* Set height for vertical Spacer */
  span:nth-child(2) {
    height: ${spacing[2]};
  }
`;

const block = `
  button {
    flex: 1;
  }
`;

const containerClassName = css`
  @media only screen and (max-width: 414px) {
    ${stacked}
  }

  @media only screen and (max-width: 660px) {
    ${block}
  }
`;

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  PrimaryAction,
  SecondaryAction,
  ...props
}) => {
  if (PrimaryAction.type !== Button || (SecondaryAction && PrimaryAction.type !== Button)) {
    // eslint-disable-next-line no-console
    console.error('Modal footer actions need to be CDS Button component');

    return null;
  }

  return (
    <HStack
      spacingHorizontal={3}
      spacingVertical={2}
      justifyContent="flex-end"
      width="100%"
      gap={2}
      dangerouslySetClassName={containerClassName}
      {...props}
    >
      {SecondaryAction}
      {PrimaryAction}
    </HStack>
  );
};
