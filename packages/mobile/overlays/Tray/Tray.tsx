import React, {
  createContext,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LayoutChangeEvent, useWindowDimensions } from 'react-native';
import { MAX_OVER_DRAG } from '@cbhq/cds-common/animation/drawer';
import { verticalDrawerPercentageOfView as defaultVerticalDrawerPercentageOfView } from '@cbhq/cds-common/tokens/drawer';
import { DrawerRefBaseProps, NoopFn, TrayBaseProps } from '@cbhq/cds-common/types';

import { HStack, VStack } from '../../layout';
import { TextTitle3 } from '../../typography/TextTitle3';
import { Drawer } from '../Drawer/Drawer';

type RenderTrayProps = {
  handleClose: NoopFn;
};

export const TrayContext = createContext<{
  verticalDrawerPercentageOfView: number;
  titleHeight: number;
}>({
  verticalDrawerPercentageOfView: defaultVerticalDrawerPercentageOfView,
  titleHeight: 0,
});

export const Tray = memo(
  forwardRef<DrawerRefBaseProps, TrayBaseProps>(function Tray(
    {
      children,
      title,
      onVisibilityChange,
      verticalDrawerPercentageOfView = defaultVerticalDrawerPercentageOfView,
      ...props
    },
    ref,
  ) {
    const [titleHeight, setTitleHeight] = useState(0);

    const onTitleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        if (!title) return;
        setTitleHeight(event.nativeEvent.layout.height);
      },
      [title],
    );

    const renderChildren = useCallback(
      ({ handleClose }: RenderTrayProps) => (
        <VStack spacingTop={title ? 0 : 2}>
          {title ? (
            <HStack
              alignItems="center"
              onLayout={onTitleLayout}
              spacingBottom={2}
              spacingHorizontal={3}
              spacingTop={3}
            >
              <TextTitle3>{title}</TextTitle3>
            </HStack>
          ) : null}
          {typeof children === 'function' ? children({ handleClose }) : children}
        </VStack>
      ),
      [children, onTitleLayout, title],
    );

    useEffect(() => {
      onVisibilityChange?.('visible');
      return () => {
        onVisibilityChange?.('hidden');
      };
    }, [onVisibilityChange]);

    const trayContextValue = useMemo(
      () => ({ verticalDrawerPercentageOfView, titleHeight }),
      [verticalDrawerPercentageOfView, titleHeight],
    );

    return (
      <TrayContext.Provider value={trayContextValue}>
        <Drawer
          pin="bottom"
          verticalDrawerPercentageOfView={trayContextValue.verticalDrawerPercentageOfView}
          {...props}
          ref={ref}
        >
          {renderChildren}
        </Drawer>
      </TrayContext.Provider>
    );
  }),
);

export const TrayStickyFooter = ({ children }: { children: ReactNode }) => {
  const { verticalDrawerPercentageOfView, titleHeight } = useContext(TrayContext);
  const { height } = useWindowDimensions();
  const verticalDrawerMaxHeight = useMemo(
    () => (height - titleHeight) * verticalDrawerPercentageOfView - MAX_OVER_DRAG,
    [height, titleHeight, verticalDrawerPercentageOfView],
  );
  return <VStack maxHeight={verticalDrawerMaxHeight}>{children}</VStack>;
};
