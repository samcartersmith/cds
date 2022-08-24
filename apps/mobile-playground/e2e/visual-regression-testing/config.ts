import { merge } from 'lodash';

export type VisregConfig = {
  deviceScrollOffset: {
    ios: number;
  };
  deviceSwipeOffset: {
    android: number;
  };
  screenshotArtifacts: {
    baseDir: string;
    playgroundDir: string;
  };
  playgroundRoutesToExclude: {
    always: string[];
    ios: string[];
    android: string[];
  };
  playgroundTestIds: {
    homeScreen: string;
    homeFlatList: string;
    screen: string;
    scrollView: string;
    scrollViewEnd: string;
  };
};

const defaultConfig: VisregConfig = {
  deviceScrollOffset: {
    ios: 700,
  },
  deviceSwipeOffset: {
    android: 1,
  },
  screenshotArtifacts: {
    // TODO: make robust by using absolute rather than relative paths using <rootDir>
    baseDir: '../../artifacts',
    playgroundDir: 'playground-screenshots',
  },
  playgroundRoutesToExclude: {
    always: [
      'Alerts', // pointless
      'TooltipV2', // pointless
      'Tray', // pointless
      'HeroSquare' /** large; 29 scrolls @ 500 px scroll */,
      'Pictogram' /** large; 29 scrolls @ 500 px scroll */,
      'SpotRectangle' /** large; 45 scrolls @ 500 px scroll */,
      'SpotSquare' /** large; 41 scrolls @ 500 px scroll */,
      'Card' /** Not sure */,
      'Carousel' /** Uses random images so order changes */,
      'ContentCellFallback' /** Animation */,
      'ListCellFallback' /** Animation */,
      'LottieStatusAnimation' /** Animation */,
      'DebugFrontier' /** Not in main route list UI */,
      'ContentCell' /** Main Queue jammed - looked like image networking */,
      'Dots' /** Main Queue jammed - looked like image networking */,
      'Modal' /** Modal is displayed over expected screen */,
      'RemoteImage' /**  Main Queue jammed - looked like image networking */,
      'RemoteImageGroup' /**  Main Queue jammed - looked like image networking */,
      'Sparkline' /**  Main Queue jammed - looked like image networking */,
      'Tabs' /** Non-deterministic animation */,
      'Text' /** Not sure */,
      'TextCaption' /** Not sure */,
      'SparklineInteractive',
      'SparklineInteractiveHeader',
      'Icon',
      'InputIcon' /** Scroll selects the input text box */,
      'InputIconButton' /** Scroll selects the input text box */,
      'SearchInput' /** Scroll selects the input text box */,
      'TextInput' /** Scroll selects the input text box */,
    ],
    ios: [],
    android: ['Accordion', 'Select'],
  },
  playgroundTestIds: {
    homeScreen: 'mobile-playground-home-screen',
    homeFlatList: 'mobile-playground-home-flatlist',
    screen: 'mobile-playground-screen',
    scrollView: 'mobile-playground-scrollview',
    scrollViewEnd: 'mobile-playground-scrollview-end',
  },
};

// TODO: figure out how to pick up override config
export default merge(defaultConfig, {});
