import { routes } from '@cbhq/cds-mobile/examples/newRoutes';
import { getPlaygroundRoutes, uploadScreenshotsToPercyForRoute } from '@cbhq/ui-mobile-visreg';

const disabledRoutes = {
  disabledRoutes: [
    'Alert', // pointless
    'AnimatedCaret', // pointless
    'ContentCellFallback' /** Animation */,
    'ListCellFallback' /** Animation */,
    'TooltipV2', // pointless
    'Tray', // pointless
    'LottieStatusAnimation' /** Animation */,
    'Modal' /** Modal is displayed over expected screen */,
    'PatternTagError' /** Modal is displayed over expected screen, and also Android specific issue preventing navigation to screen */,
  ],
  iosDisabledRoutes: [],
  androidDisabledRoutes: [
    'Accordion',
    'Select',
    'SparklineInteractive',
    'SparklineInteractiveHeader',
    'Card' /** Not sure */,
    'Carousel' /** Uses random images so order changes */,
    'DebugFrontier' /** Not in main route list UI */,
    'ContentCell' /** Main Queue jammed - looked like image networking */,
    'Dots' /** Main Queue jammed - looked like image networking */,
    'RemoteImage' /**  Main Queue jammed - looked like image networking */,
    'RemoteImageGroup' /**  Main Queue jammed - looked like image networking */,
    'Sparkline' /**  Main Queue jammed - looked like image networking */,
    'Tabs' /** Non-deterministic animation */,
    'Text' /** Not sure */,
    'TextCaption' /** Not sure */,
    'Icon',
    'InputIcon' /** Scroll selects the input text box */,
    'InputIconButton' /** Scroll selects the input text box */,
    'SearchInput' /** Scroll selects the input text box */,
    'TextInput' /** Scroll selects the input text box */,
  ],
};

describe('All Playground Routes', () => {
  it.each(getPlaygroundRoutes({ routes, ...disabledRoutes }))(
    '%p Visual Diff Test.',
    async (routeName) => {
      await device.openURL({
        url: `cds://Debug${routeName}`,
      });

      await uploadScreenshotsToPercyForRoute(routeName);
    },
  );
});
