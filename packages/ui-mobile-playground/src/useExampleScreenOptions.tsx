/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useContext, useMemo } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackHeaderProps } from '@react-navigation/stack';
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

const safeAreaInsets = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export function useExampleScreenOptions() {
  const palette = usePalette();
  const { top } = useSafeAreaInsets();
  const [headerSize, onLayout] = useLayout();
  const iconButtonHeight = useInteractableHeight();
  const setFilter = useContext(SetSearchFilterContext);

  const style = useMemo(() => ({ marginTop: top }), [top]);

  const header = useMemo(() => {
    return ({ navigation, scene, styleInterpolator }: StackHeaderProps) => {
      const isFocused = navigation.isFocused();
      const canGoBack = navigation.canGoBack();
      const goBack = () => {
        navigation.goBack();
        setFilter('');
      };
      const goToSearch = () => navigation.navigate(searchRouteName);
      const routeName = scene.route.name;
      const titleForScene = scene.descriptor.options.title;
      const isSearch = routeName === searchRouteName;
      const { titleStyle } = styleInterpolator({
        current: { progress: scene.progress.current },
        next: scene.progress.next && { progress: scene.progress.next },
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
        <Box animated background onLayout={onLayout} dangerouslySetStyle={style}>
          <HStack
            alignItems="center"
            justifyContent="center"
            spacingVertical={1}
            spacingHorizontal={2}
          >
            {leftHeaderButton}
            <Spacer />
            <Box
              width="100%"
              pointerEvents={isSearch ? undefined : 'none'}
              position="absolute"
              alignItems="center"
            >
              {isSearch ? (
                <TextInput
                  accessibilityLabel="Search for component"
                  start={<IconButton transparent name="backArrow" onPress={goBack} />}
                  label=""
                  placeholder="Search"
                  onChange={handleSearch}
                  accessibilityHint="Search for component"
                />
              ) : (
                <TextHeadline align="center" animated dangerouslySetStyle={titleStyle}>
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

  return useMemo(
    () =>
      ({
        initialRouteName,
        screenOptions: {
          headerBackAllowFontScaling: false,
          headerBackTitleVisible: false,
          headerTitleAllowFontScaling: false,
          headerStyle: {
            backgroundColor: palette.background,
            borderWidth: 0,
            shadowColor: 'transparent',
            height: headerSize.height,
          },
          safeAreaInsets,
          header,
          gestureDirection: 'horizontal',
        },
      } as const),
    [header, headerSize.height, palette.background],
  );
}
