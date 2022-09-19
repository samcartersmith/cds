import { readFileSync } from 'fs';

import { s3, S3_BUCKET_NAME } from './constants';

type UploadParams = {
  key: string;
  file: string;
};

export function upload({ key, file }: UploadParams) {
  s3.putObject({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: readFileSync(file),
  })
    .promise()
    .then(
      () => true,
      (err) => {
        throw err;
      },
    );
}
