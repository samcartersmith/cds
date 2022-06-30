import { routes } from '@cbhq/cds-mobile/examples/routes';

const badTests = ['Alerts', 'TooltipV2', 'Tray'];
export const largeTests = [
  'HeroSquare' /** 29 scrolls @ 500 px scroll */,
  'Pictogram' /** 29 scrolls @ 500 px scroll */,
  'SpotRectangle' /** 45 scrolls @ 500 px scroll */,
  'SpotSquare' /** 41 scrolls @ 500 px scroll */,
];

const broken = [
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
  'Text' /** Not sure */,
  'TextCaption' /** Not sure */,
  'SparklineInteractive',
  'SparklineInteractiveHeader',
  'Icon',
  'InputIcon' /** Scroll selects the input text box */,
  'InputIconButton' /** Scroll selects the input text box */,
  'SearchInput' /** Scroll selects the input text box */,
  'TextInput' /** Scroll selects the input text box */,
];

export const routesNames = Object.values(routes)
  .filter(({ name }) => !broken.includes(name)) /** Remove broken routes */
  .filter(({ name }) => !badTests.includes(name)) /** Remove pointless tests */
  .filter(
    ({ name }) => !largeTests.includes(name),
  ) /** Remove really big tests that should be own run. */
  .map((route) => route.name);
