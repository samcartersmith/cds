import { memo } from 'react';

import readmes from '../components/readmes';

export type StaticReadmeFields = {
  fileName: 'root';
};

export const StaticReadme = memo(function StaticReadme({ fileName }: StaticReadmeFields) {
  return readmes[fileName];
});
