// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@cbhq/detox-utils');

const detoxConfig = createConfig({
  iosAppName: 'MobilePlayground',
  iosWorkspaceName: 'MobilePlayground',
  runnerConfig: './jest-visreg.config.json',
  universal: false,
});

/**
 * Required in order to run Android emulator on CI.
 * https://android.stackexchange.com/questions/190913/cannot-start-android-emulator64-due-to-qt-unable-to-load-xcb
 */
detoxConfig.devices.emulator.bootArgs = '-writable-system -no-window';

const disabledRoutes = {
  disabledRoutes: [
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
  iosDisabledRoutes: [],
  androidDisabledRoutes: ['Accordion', 'Select'],
};

const config = { ...detoxConfig, disabledRoutes };

module.exports = config;
