import { TrayBaseProps } from '@cbhq/cds-common/types';
import React, { memo } from 'react';
import { Drawer } from '../Drawer/Drawer';
import { TextTitle3 } from '../../typography/TextTitle3';
import { HStack, VStack } from '../../layout';

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Tray: React.FC<TrayBaseProps> = memo(({ children, title, ...props }) => {
  return (
    <Drawer pin="bottom" {...props}>
      {({ closeDrawer: closeTray }) => (
        <VStack spacingTop={title ? 0 : 2}>
          {title ? (
            <HStack spacingHorizontal={3} spacingTop={3} spacingBottom={2} alignItems="center">
              <TextTitle3>{title}</TextTitle3>
            </HStack>
          ) : null}
          {typeof children === 'function' ? children({ closeTray }) : children}
        </VStack>
      )}
    </Drawer>
  );
});

Tray.displayName = 'Tray';
