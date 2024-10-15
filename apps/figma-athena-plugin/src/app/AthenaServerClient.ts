const PROD_HOST = 'https://figma-athena.cbhq.net';
const LOCAL_HOST = 'http://localhost:3001';

export class AthenaServerClient {
  private static getHost() {
    return process.env.NODE_ENV === 'production' ? PROD_HOST : LOCAL_HOST;
  }

  static async post<Response extends Record<string, unknown>>(path: string, body: string) {
    const host = AthenaServerClient.getHost();
    const result = await fetch(`${host}/${path}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    return (await result.json()) as Response;
  }
}
