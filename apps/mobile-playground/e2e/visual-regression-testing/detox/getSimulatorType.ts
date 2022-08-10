import config from '../../../detox.config';

export default function getSimulatorType() {
  return config.devices.simulator.device.type;
}
