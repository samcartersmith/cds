import noop from 'lodash/noop';
import { NativeModules } from 'react-native';

// Only implemented on Android -- it's a noop on iOS
const CustomTabsHelper = NativeModules.CustomTabsHelperModule || {
  preventRedirectionIntoApp: noop,
};

export { CustomTabsHelper };
