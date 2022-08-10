import { routes as codegenRoutes } from '@cbhq/cds-mobile/examples/newRoutes';

// Detox Nav related (hopefully we can remove)
export const homeScreenTitle = 'CDS';
export const homeScreenListTestID = 'cds_home_flatlist';
export const exampleScreenTestID = 'example_screen_scrollview';

export const iosDisabledRoutes = [];
export const androidDisabledRoutes = ['Accordion', 'Select'];
export const disabledRoutes = [
  'Alerts' /** Pointless test */,
  'TooltipV2' /** Pointless test */,
  'Tray' /** Pointless test */,
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
  'Tabs' /** Non-determistic animation */,
  'Text' /** Not sure */,
  'TextCaption' /** Not sure */,
  'SparklineInteractive',
  'SparklineInteractiveHeader',
  'Icon',
  'InputIcon' /** Scroll selects the input text box */,
  'InputIconButton' /** Scroll selects the input text box */,
  'SearchInput' /** Scroll selects the input text box */,
  'TextInput' /** Scroll selects the input text box */,

  // Large tests:
  'HeroSquare' /** 29 scrolls @ 500 px scroll */,
  'Pictogram' /** 29 scrolls @ 500 px scroll */,
  'SpotRectangle' /** 45 scrolls @ 500 px scroll */,
  'SpotSquare' /** 41 scrolls @ 500 px scroll */,
];

export const routes = codegenRoutes;
