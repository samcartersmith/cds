import https from 'node:https';
import { URL } from 'node:url';

import { Response } from './types';

type Primitive = string | boolean | number;

export function createClient<
  ApiParams extends Record<string, Primitive>,
  ClientResponse extends Response,
>() {
  return async function api(path: string, params?: ApiParams) {
    const figmaUrl = new URL(`https://api.figma.com/v1/${path}`);

    Object.entries(params ?? {}).forEach(([param, paramValue]) => {
      const value = typeof paramValue === 'string' ? paramValue : `${paramValue}`;
      figmaUrl.searchParams.set(param, value);
    });

    return new Promise<ClientResponse>((resolve, reject) => {
      let resBody = '';

      const req = https.request(
        {
          hostname: figmaUrl.hostname,
          path: `${figmaUrl.pathname}?${figmaUrl.searchParams.toString()}`,
          method: 'GET',
          headers: {
            'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
          },
        },
        (res) => {
          res.setEncoding('utf8');
          res.on('data', (chunk: string) => {
            resBody += chunk;
          });
          res.on('end', () => {
            const data = JSON.parse(resBody) as ClientResponse;

            // Figma API is not consistent with its response structure, endpoints don't always return a 200 status,
            // but should always return a non 200 status
            if (data.status && data.status !== 200) {
              reject(new Error(`Status: ${data.status}, Message: ${data.err}, URL: ${figmaUrl}`));
            } else {
              resolve(data);
            }
          });
        },
      );

      req.on('error', (e) => {
        reject(e);
      });

      req.end();
    });
  };
}
