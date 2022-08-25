import { DetoxConfig } from '../detoxConfig';

// TODO: make more robust using device specs instead of just name
export default function isExpectedAndroidDevice(config: DetoxConfig) {
  return (
    config.devices.emulator.device.avdName === 'Pixel_3a_API_30' &&
    config.devices.emulator.type === 'android.emulator'
  );
}
