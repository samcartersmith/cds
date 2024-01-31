import {
  getPlaygroundRoutes,
  routes,
  uploadScreenshotsToPercyForRoute,
} from '@cbhq/ui-mobile-visreg';

const affectedRouteKeys = process.env.DETOX_AFFECTED_ROUTE_KEYS?.split(',');

const filteredRoutes = !affectedRouteKeys
  ? routes
  : routes.filter((route) => affectedRouteKeys.includes(route.key));

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
    'PatternDisclosureHighFrictionBenefit' /** Modal is displayed over expected screen, and also Android specific issue preventing navigation to screen */,
    'PatternDisclosureHighFrictionRisk' /** Modal is displayed over expected screen, and also Android specific issue preventing navigation to screen */,
    'PatternDisclosureLowFriction' /** Modal is displayed over expected screen, and also Android specific issue preventing navigation to screen */,
    'PatternDisclosureMedFriction' /** Modal is displayed over expected screen, and also Android specific issue preventing navigation to screen */,
    'PatternError' /** Modal is displayed over expected screen, and also Android specific issue preventing navigation to screen */,
  ],
  iosDisabledRoutes: [],
  androidDisabledRoutes: [
    'Accordion',
    'Select',
    'SparklineInteractive',
    'SparklineInteractiveHeader',
    'Card' /** Not sure */,
    'Carousel' /** Uses random images so order changes */,
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

const testRoutes = getPlaygroundRoutes({ routes: filteredRoutes, ...disabledRoutes });

if (!testRoutes.length) process.exit(0);

describe('All Playground Routes', () => {
  it.each(testRoutes)('%p Visual Diff Test.', async (routeName) => {
    await device.openURL({
      url: `cds://Debug${routeName}`,
    });

    await uploadScreenshotsToPercyForRoute(routeName);
  });
});
