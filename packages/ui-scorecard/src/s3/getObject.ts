import { createWriteStream } from 'fs';

import { s3, S3_BUCKET_NAME } from './constants';

type GetParams = {
  key: string;
  destination: string;
};

export async function getObject({ key, destination }: GetParams) {
  return new Promise<void>((resolve, reject) => {
    s3.getObject({
      Bucket: S3_BUCKET_NAME,
      Key: key,
    })
      .createReadStream()
      .on('error', reject)
      .pipe(createWriteStream(destination).once('finish', resolve));
  });
}
