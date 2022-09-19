import { S3 } from 'aws-sdk';

const S3_API_VERSION = '2011-06-15';
export const S3_BUCKET_NAME = 'buildkite-ui-scorecard';

export const s3 = new S3({
  apiVersion: S3_API_VERSION,
});
