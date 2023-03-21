import { DetoxConfig } from '../detoxConfig';

export default function getSimulatorType(config: DetoxConfig) {
  return config.devices.simulator.device.type;
}
