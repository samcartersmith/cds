/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useContext, useMemo } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackHeaderProps, StackNavigationOptions } from '@react-navigation/stack';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';
import { IconButton } from '@cbhq/cds-mobile/buttons/IconButton';
import { TextInput } from '@cbhq/cds-mobile/controls/TextInput';
import { useLayout } from '@cbhq/cds-mobile/hooks/useLayout';
import { usePalette } from '@cbhq/cds-mobile/hooks/usePalette';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { HStack } from '@cbhq/cds-mobile/layout/HStack';
import { Spacer } from '@cbhq/cds-mobile/layout/Spacer';
import { TextHeadline } from '@cbhq/cds-mobile/typography/TextHeadline';

import { SetSearchFilterContext } from './ExamplesSearchProvider';
import { initialRouteName, searchRouteName } from './staticRoutes';

export function useExampleNavigatorProps() {
  const palette = usePalette();
  const { top } = useSafeAreaInsets();
  const [headerSize, onLayout] = useLayout();
  const iconButtonHeight = useInteractableHeight();
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
        <Box offsetHorizontal={1}>
          <IconButton transparent name="backArrow" onPress={goBack} />
        </Box>
      ) : (
        iconButtonPlaceholder
      );

      const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
        setFilter(e.nativeEvent.text);

      const rightHeaderButton = showSearch ? (
        <Box offsetHorizontal={1}>
          <IconButton transparent name="search" onPress={goToSearch} />
        </Box>
      ) : (
        iconButtonPlaceholder
      );

      return (
        <Box animated background dangerouslySetStyle={style} onLayout={onLayout}>
          <HStack
            alignItems="center"
            justifyContent="center"
            spacingHorizontal={2}
            spacingVertical={1}
          >
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
                <TextHeadline animated align="center" dangerouslySetStyle={titleStyle}>
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
  }, [headerSize, iconButtonHeight, onLayout, setFilter, style]);

  return useMemo(() => {
    const screenOptions: StackNavigationOptions = {
      headerBackAllowFontScaling: false,
      headerBackTitleVisible: false,
      headerTitleAllowFontScaling: false,
      headerMode: 'float',
      headerStyle: {
        backgroundColor: palette.background,
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
  }, [header, headerSize.height, palette.background]);
}
