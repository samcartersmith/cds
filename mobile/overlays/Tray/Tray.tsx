import React, { memo, forwardRef, PropsWithChildren, useCallback } from 'react';
import { DrawerRefBaseProps, NoopFn, TrayBaseProps } from '@cbhq/cds-common/types';
import { Drawer } from '../Drawer/Drawer';
import { TextTitle3 } from '../../typography/TextTitle3';
import { HStack, VStack } from '../../layout';

type RenderTrayProps = {
  handleClose: NoopFn;
};

/** @deprecated DO NOT USE: This is an unreleased component and is unstable */
export const Tray = memo(
  forwardRef<DrawerRefBaseProps, PropsWithChildren<TrayBaseProps>>(
    ({ children, title, ...props }, ref) => {
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
    },
  ),
);
