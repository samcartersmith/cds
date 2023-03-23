import React, { forwardRef, memo, useCallback } from 'react';
import { DrawerRefBaseProps, NoopFn, TrayBaseProps } from '@cbhq/cds-common/types';

import { HStack, VStack } from '../../layout';
import { TextTitle3 } from '../../typography/TextTitle3';
import { Drawer } from '../Drawer/Drawer';

type RenderTrayProps = {
  handleClose: NoopFn;
};

export const Tray = memo(
  forwardRef<DrawerRefBaseProps, TrayBaseProps>(function Tray({ children, title, ...props }, ref) {
    const renderChildren = useCallback(
      ({ handleClose }: RenderTrayProps) => (
        <VStack spacingTop={title ? 0 : 2}>
          {title ? (
            <HStack spacingHorizontal={3} spacingTop={3} spacingBottom={2} alignItems="center">
              <TextTitle3>{title}</TextTitle3>
            </HStack>
          ) : null}
          {typeof children === 'function' ? children({ handleClose }) : children}
        </VStack>
      ),
      [children, title],
    );

    return (
      <Drawer pin="bottom" {...props} ref={ref}>
        {renderChildren}
      </Drawer>
    );
  }),
);
