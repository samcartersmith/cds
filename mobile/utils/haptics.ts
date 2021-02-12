import noop from 'lodash/noop';
import { NativeModules } from 'react-native';

const HapticsModule = NativeModules.Haptics || {
  impactAsync: noop,
  notificationAsync: noop,
};

const notification = (type: 'success' | 'warning' | 'error'): Promise<void> =>
  HapticsModule.notificationAsync(type);

const successNotification = () => notification('success');

const warningNotification = () => notification('warning');

const errorNotification = () => notification('error');

const impact = (style: 'light' | 'medium' | 'heavy'): Promise<void> =>
  HapticsModule.impactAsync(style);

const lightImpact = () => impact('light');

const normalImpact = () => impact('medium');

const heavyImpact = () => impact('heavy');

export const Haptics = {
  successNotification,
  warningNotification,
  errorNotification,
  lightImpact,
  normalImpact,
  heavyImpact,
};
