/* eslint-disable react-perf/jsx-no-new-function-as-prop */

import React, { useContext, useMemo } from 'react';
import { NativeSyntheticEvent, Pressable, TextInputChangeEventData } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackHeaderProps, StackNavigationOptions } from '@react-navigation/stack';
import type { ColorScheme } from '@cbhq/cds-common2/core/theme';
import { interactableHeight } from '@cbhq/cds-common2/tokens/interactableHeight';
import { IconButton } from '@cbhq/cds-mobile2/buttons/IconButton';
import { TextInput } from '@cbhq/cds-mobile2/controls/TextInput';
import { useLayout } from '@cbhq/cds-mobile2/hooks/useLayout';
import { useTheme } from '@cbhq/cds-mobile2/hooks/useTheme';
import { Box } from '@cbhq/cds-mobile2/layout/Box';
import { HStack } from '@cbhq/cds-mobile2/layout/HStack';
import { Spacer } from '@cbhq/cds-mobile2/layout/Spacer';
import { TextHeadline } from '@cbhq/cds-mobile2/typography/TextHeadline';

import { SetSearchFilterContext } from './ExamplesSearchProvider';
import { initialRouteName, searchRouteName } from './staticRoutes';

type UseExampleNavigatorPropsOptions = {
  setColorScheme?: React.Dispatch<React.SetStateAction<ColorScheme>>;
};

const invisiblePressableStyle = {
  width: 40,
  height: 40,
};

export function useExampleNavigatorProps({ setColorScheme }: UseExampleNavigatorPropsOptions) {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  const [headerSize, onLayout] = useLayout();
  const iconButtonHeight = interactableHeight.regular;
  const setFilter = useContext(SetSearchFilterContext);

  const style = useMemo(() => ({ marginTop: top }), [top]);

  const header = useMemo(() => {
    return ({ navigation, route, options, progress, styleInterpolator }: StackHeaderProps) => {
      const isFocused = navigation.isFocused();
      const canGoBack = navigation.canGoBack();
      const goBack = () => {
        navigation.goBack();
        setFilter('');
      };
      const goToSearch = () => navigation.navigate(searchRouteName);
      const routeName = route.name;
      const titleForScene = options.title;
      const isSearch = routeName === searchRouteName;
      const { titleStyle } = styleInterpolator({
        current: { progress: progress.current },
        next: progress.next && { progress: progress.next },
        layouts: {
          header: headerSize,
          title: headerSize,
          screen: headerSize,
        },
      });
      const showBackButton = isFocused && canGoBack && !isSearch;
      const showSearch = routeName === initialRouteName;

      const iconButtonPlaceholder = <Box height={iconButtonHeight} />;

      const leftHeaderButton = showBackButton ? (
        <Box marginX={-1}>
          <IconButton transparent name="backArrow" onPress={goBack} />
        </Box>
      ) : (
        iconButtonPlaceholder
      );

      const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
        setFilter(e.nativeEvent.text);

      const toggleDark = () => setColorScheme?.((s) => (s === 'dark' ? 'light' : 'dark'));

      const rightHeaderButton = showSearch ? (
        <Box marginX={-1}>
          <IconButton transparent name="search" onPress={goToSearch} />
        </Box>
      ) : (
        <Box height={iconButtonHeight} marginX={-1}>
          <Pressable onPress={toggleDark} style={invisiblePressableStyle} />
        </Box>
      );

      return (
        <Box animated background="background" onLayout={onLayout} style={style}>
          <HStack alignItems="center" justifyContent="center" paddingX={2} paddingY={1}>
            {leftHeaderButton}
            <Spacer />
            <Box
              alignItems="center"
              pointerEvents={isSearch ? undefined : 'none'}
              position="absolute"
              width="100%"
            >
              {isSearch ? (
                <TextInput
                  accessibilityHint="Search for component"
                  accessibilityLabel="Search for component"
                  label=""
                  onChange={handleSearch}
                  placeholder="Search"
                  start={<IconButton transparent name="backArrow" onPress={goBack} />}
                />
              ) : (
                <TextHeadline animated align="center" style={titleStyle}>
                  {titleForScene}
                </TextHeadline>
              )}
            </Box>
            <Spacer />
            {rightHeaderButton}
          </HStack>
        </Box>
      );
    };
  }, [headerSize, iconButtonHeight, onLayout, setFilter, style, setColorScheme]);

  return useMemo(() => {
    const screenOptions: StackNavigationOptions = {
      headerBackAllowFontScaling: false,
      headerBackTitleVisible: false,
      headerTitleAllowFontScaling: false,
      headerMode: 'float',
      headerStyle: {
        backgroundColor: theme.color.background,
        borderWidth: 0,
        shadowColor: 'transparent',
        height: headerSize.height,
      },
      header,
      gestureDirection: 'horizontal',
    };

    return {
      initialRouteName,
      screenOptions,
    };
  }, [header, headerSize.height, theme.color.background]);
}
