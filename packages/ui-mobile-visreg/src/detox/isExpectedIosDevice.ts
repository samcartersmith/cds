import { DetoxConfig } from '../detoxConfig';

// TODO: make more robust using device specs instead of just name
export default function isExpectedIosDevice(config: DetoxConfig) {
  return (
    config.devices.simulator.device.type === 'iPhone 14' &&
    config.devices.simulator.type === 'ios.simulator'
  );
}
