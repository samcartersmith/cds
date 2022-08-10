import config from '../../../detox.config';

// TODO: make more robust using device specs instead of just name
export default function isExpectedIosDevice() {
  return (
    config.devices.simulator.device.type === 'iPhone 12' &&
    config.devices.simulator.type === 'ios.simulator'
  );
}
