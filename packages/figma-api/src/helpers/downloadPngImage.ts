import fs from 'node:fs';
import https from 'node:https';

export async function downloadPngImage(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let imagedata = '';
      response.setEncoding('binary');
      response.on('data', (chunk) => {
        imagedata += chunk;
      });
      response.on('end', () => {
        fs.promises
          .writeFile(dest, imagedata, { encoding: 'binary' })
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  });
}
