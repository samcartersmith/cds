import { useMemo } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;
const statusBarHeight = StatusBar.currentHeight ?? 0;

export function useDimensions() {
  const { top, bottom } = useSafeAreaInsets();
  const windowHeight = useMemo(() => {
    const h = Dimensions.get('window').height;
    // https://github.com/facebook/react-native/issues/23693
    // For Android devices with a top notch like the Samsung Galaxy S10
    // the window height does not return value with status bar
    // height included so we have to manually add here
    return top <= 24 ? h : h + top;
  }, [top]);
  const bottomNavHeight = screenHeight - windowHeight;

  return {
    top,
    bottom,
    screenWidth,
    screenHeight,
    windowWidth,
    windowHeight,
    bottomNavHeight,
    statusBarHeight,
  };
}
