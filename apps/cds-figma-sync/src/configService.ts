/* eslint-disable consistent-return */
import configServiceNode from '@cb/config-service-node';

import { logger } from './logger.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const ConfigServiceClient: typeof configServiceNode = (configServiceNode as any).default;

const configServiceScope = 'frontend/cds-cds-figma-sync';

const isEnabled = process.env.ENABLE_CONFIG_SERVICE !== 'false';

const configServiceClient = new ConfigServiceClient({
  environment: 'DEVELOPMENT',
  onError: logger.error,
  expiration: 30 * 60 * 1000, // 30 minutes
});

let initialized = false;

export const initializeConfigService = async () => {
  if (!isEnabled) return;
  initialized = true;
  return configServiceClient.initialize(configServiceScope);
};

/**
 * When process.env.ENABLE_CONFIG_SERVICE === 'false', this function will
 * return process.env[name] instead of the Config Service value.
 */
export const getConfigServiceValue = (name: string): string | undefined => {
  if (!isEnabled) return process.env[name];
  if (!initialized)
    throw Error('Attempted to get config service value before calling initializeConfigService');
  const param = configServiceClient.getParameter(
    configServiceScope,
    name,
    // @ts-expect-error this type is not supported
    'TEXT',
  );

  // @ts-expect-error not typed
  if (param?.body?.text) {
    // @ts-expect-error not typed
    return param.body.text as string;
  }
};
