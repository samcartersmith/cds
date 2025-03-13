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
import { MAX_OVER_DRAG } from '@cbhq/cds-common2/animation/drawer';
import { verticalDrawerPercentageOfView as defaultVerticalDrawerPercentageOfView } from '@cbhq/cds-common2/tokens/drawer';
import { DrawerRefBaseProps, TrayBaseProps } from '@cbhq/cds-common2/types';

import { Box, HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { Drawer } from '../drawer/Drawer';

type RenderTrayProps = {
  handleClose: () => void;
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
        <VStack paddingTop={title ? 0 : 2}>
          {title &&
            (typeof title === 'string' ? (
              <HStack
                alignItems="center"
                onLayout={onTitleLayout}
                paddingBottom={2}
                paddingTop={3}
                paddingX={3}
              >
                <Text font="title3">{title}</Text>
              </HStack>
            ) : (
              <Box onLayout={onTitleLayout}>{title}</Box>
            ))}
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
