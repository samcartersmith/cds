import React, { useCallback, useMemo } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { gutter } from '@cbhq/cds-common2/tokens/sizing';
import type { PaddingProps } from '@cbhq/cds-common2/types';

import { Switch } from '../controls/Switch';
import { useTheme } from '../hooks/useTheme';
import { Box, BoxProps } from '../layout/Box';
import { Divider } from '../layout/Divider';
import { VStack } from '../layout/VStack';
import { ThemeProvider } from '../system';
import { denseTheme } from '../themes/denseTheme';
import { Text } from '../typography/Text';

type ExampleRenderChildren = () => NonNullable<JSX.Element>;
export type ExampleProps = {
  children: ExampleRenderChildren | React.ReactNode[] | React.ReactNode;
  inline?: boolean;
  title?: string;
  titlePadding?: PaddingProps;
} & Omit<BoxProps, 'children'>;

export const Example = ({ children, inline, title, titlePadding, ...props }: ExampleProps) => {
  const childStyles = useMemo(() => {
    const style: ViewStyle = { paddingTop: 12 };

    if (inline) {
      style.alignItems = 'flex-start';
    }

    return style;
  }, [inline]);

  const content = (
    <>
      <Box background="bg" padding={2} paddingBottom={3} {...props}>
        {!!title && (
          <Text font="title3" {...titlePadding}>
            {title}
          </Text>
        )}

        {typeof children === 'function'
          ? children()
          : React.Children.map(children, (item, index) => (
              <View key={index} style={childStyles}>
                {item}
              </View>
            ))}
      </Box>
      <Divider />
    </>
  );

  return content;
};

const Screen: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme();

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      persistentScrollbar={false}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: theme.color.bg, height: '100%' }}
      testID="mobile-playground-scrollview"
    >
      {children}
      <Divider testID="mobile-playground-scrollview-end" />
    </ScrollView>
  );
};

export const ExampleScreen: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme();
  const noop = useCallback(() => {}, []);
  return (
    <VStack testID="mobile-playground-screen">
      <Screen>
        <ThemeProvider activeColorScheme={theme.activeColorScheme} theme={denseTheme}>
          <VStack>
            <VStack background="bg" gap={1} paddingX={gutter} paddingY={3}>
              <Switch checked={theme.activeColorScheme === 'dark'} onChange={noop}>
                Dark Spectrum
              </Switch>
              <Switch checked={false} onChange={noop}>
                Dense Scale
              </Switch>
            </VStack>
            <Divider />
          </VStack>
        </ThemeProvider>
        {children}
      </Screen>
    </VStack>
  );
};
