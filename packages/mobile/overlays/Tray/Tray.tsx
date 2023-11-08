import React, { forwardRef, memo, useCallback, useEffect } from 'react';
import { DrawerRefBaseProps, NoopFn, TrayBaseProps } from '@cbhq/cds-common/types';

import { HStack, VStack } from '../../layout';
import { TextTitle3 } from '../../typography/TextTitle3';
import { Drawer } from '../Drawer/Drawer';

type RenderTrayProps = {
  handleClose: NoopFn;
};

export const Tray = memo(
  forwardRef<DrawerRefBaseProps, TrayBaseProps>(function Tray(
    { children, title, onVisibilityChange, ...props },
    ref,
  ) {
    const renderChildren = useCallback(
      ({ handleClose }: RenderTrayProps) => (
        <VStack spacingTop={title ? 0 : 2}>
          {title ? (
            <HStack alignItems="center" spacingBottom={2} spacingHorizontal={3} spacingTop={3}>
              <TextTitle3>{title}</TextTitle3>
            </HStack>
          ) : null}
          {typeof children === 'function' ? children({ handleClose }) : children}
        </VStack>
      ),
      [children, title],
    );

    useEffect(() => {
      onVisibilityChange?.('visible');
      return () => {
        onVisibilityChange?.('hidden');
      };
    }, [onVisibilityChange]);

    return (
      <Drawer pin="bottom" {...props} ref={ref}>
        {renderChildren}
      </Drawer>
    );
  }),
);
