import { TrayBaseProps } from '@cbhq/cds-common/types';
import React, { memo } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { Drawer } from '../Drawer/Drawer';
import { TextHeadline } from '../../typography';
import { HStack, VStack } from '../../layout';

export const Tray: React.FC<TrayBaseProps> = memo(({ children, title, ...props }) => {
  return (
    <Drawer pin="bottom" {...props}>
      {({ closeDrawer: closeTray }) => (
        <VStack spacingTop={title ? 0 : 1}>
          {title ? (
            <HStack spacingHorizontal={gutter} spacingVertical={gutter} alignItems="center">
              <TextHeadline>{title}</TextHeadline>
            </HStack>
          ) : null}
          {typeof children === 'function' ? children({ closeTray }) : children}
        </VStack>
      )}
    </Drawer>
  );
});

Tray.displayName = 'Tray';
