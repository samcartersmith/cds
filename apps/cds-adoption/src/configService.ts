/* eslint-disable consistent-return */
import configServiceNode from '@cb/config-service-node';
import { bot } from '@cbhq/script-utils';

// TO DO: remove this and make config service work
process.env.ENABLE_CONFIG_SERVICE = 'false';
process.env.FIGMA_ACCESS_TOKEN = 'figd_COSSW4Idcpiuf7QIvJC6mjS1F3F9AI1ahF2Ro3ig';
process.env.GITHUB_PRIVATE_KEY =
  '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAzfgWWtXaiAM+axZWbJomaAw15l43HyOAe0VylP7W5HwPqAgz\n3iGAwmbnOZkeOsw/GWmfqrUrGtu3v1H8UkVPusoOu24RHTywWUDKMlGzydMfutiY\n8i0Y5MhMg+cgDrBv5PTAVjIZOqC8+O/PuriJ/1q3BSMI+KUnlbulLILPy83fySnQ\nifDqieDbkpd2n38j3x7PGdmt004G9G+U9NM3wgv/SnXw4gH+D7Zzr43fSBrBp9WU\nXOl25L87XhUwnDar04ovBZLKSfC49/EepjuxqBbkueZtYnezx66UkIe138KgOARB\n7XODAWezHmccnTnZxWxqsjZVZ2xCpLnesTWiBQIDAQABAoIBAQCEIEZu5Mq3/6S1\n23F7X3ONwW9+JSglEIgmC8nSLJw7nB4LA6AKOeG4U3y25TOQMl+z9J7ZSjiplRMN\nZxF+0TmxMFc9AwF1iO3zg21x1BmKOaYcHUAX8rgKYzc6UjStV5+f9yW+5Yprops2\n8deHB0R3C4FmiTADGScIlYQCxrN4H6TItaKVdcs9Ka6+hrH/wz3Ash+1RIh1uhtZ\nkwaf6Ssv6UFujyyW48J0Zy98Wgshqzqh/djvmokO3vjoNCGyuQMBy09hLnHAl72Q\n5+/SbLQOy1iTwvAb7CJbylFgPqEjNFAGkEBilyA8OyqujaIRdofrLf20oon2SBOL\nEkzya7nhAoGBAPXY7jaxE2gIFimiZd5KGcMSKQVIXIN0EQmPk7vIQTzwCq3LOpVS\n0KiFn1yb0w5F+hTyWk/R3dtE2UwmQv4FRJleJv6xe6gDTtoHctZ8UnIFQfrbSSOP\nTdA1SPNvLbXMqSEM6BnBOvQ3MCL+vOGlKnzMea9wC4/x766iJiEcHDkdAoGBANZ5\nkXVOALIQjLZ0irb6a6WfSPpSwEC/o/ckaEvzmyyLhmRFe8BDgbqe5kXgSL+0TFVC\nXEkuMWNQflztg2DegK3Nv0zruh7OBlZPXIZFti5KbMQfFCC5FOpsOzRMivrxPYmy\nkhtbEZ+3SgB8K+2zi7RIUpod4SXrp716LYmpJCAJAoGABT6JZlVEqrVxc5XpQmKm\nRgj/IwO2JX+2VVPgvOK6sYgVUjvBlincFZw0GA+i4u0PNp8s2gMKDoFbeUpfp3eJ\nTRQ7FLfIgX8AkZoTEww33gLKs4U1/DI0YLqiQb8fZH9nJDNYSCRdE5SRzE1Ozilt\nzJe4CMwFEx8AE+OVmKM23ukCgYBbLw5HmCU1j1Gz1LKQ/sC7hpAJVRtFq/RzA3iQ\nKf7kHmHBycTGRi0mgZ4XQTbMwkPdz7vapRf8SGGg8p3zlkWRHzNg6auUozUQhuco\ncwT0g1Hgw/HTw7x/ugolvxErhVsLau8xUDOa+tssf55Rjg8sU79CpMdvTtRe+03X\nBCFGuQKBgC8QXW3eZPLUpn4P41J4SPIBij1LB5mP+Y2QwxwlO9MTJyWuoCSxoQdn\nRwqoKb+byhHZ+T+DZX1rGBeG2OcXKocU/VF8Zrh/rUzg3Y66upe3EEBp9i06Uka7\nn2l6GghhClsOw492/txNHd8UIRBHut1zV4Vw4UP5Ciiy35peL3LX\n-----END RSA PRIVATE KEY-----';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const ConfigServiceClient: typeof configServiceNode = (configServiceNode as any).default;

const configServiceScope = 'frontend/cds-cds-adoption';

const isEnabled = process.env.ENABLE_CONFIG_SERVICE !== 'false';

const configServiceClient = new ConfigServiceClient({
  environment: 'DEVELOPMENT',
  onError: bot.logger.error,
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
