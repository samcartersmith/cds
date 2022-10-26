import https from 'node:https';
import { URL } from 'node:url';

type Primitive = string | boolean | number;

export function createClient<ApiParams extends Record<string, Primitive>, Response>() {
  return async function api(path: string, params?: ApiParams) {
    const figmaUrl = new URL(`https://api.figma.com/v1/${path}`);

    Object.entries(params ?? {}).forEach(([param, paramValue]) => {
      const value = typeof paramValue === 'string' ? paramValue : `${paramValue}`;
      figmaUrl.searchParams.set(param, value);
    });

    return new Promise<Response>((resolve, reject) => {
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
            const data = JSON.parse(resBody) as Response;
            resolve(data);
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
