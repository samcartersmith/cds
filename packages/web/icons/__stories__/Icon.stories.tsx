import { Icon } from '../Icon';

import { IconSheet } from './IconSheet';

export default {
  title: 'Icon',
  component: Icon,
};

// TODO: figure out a way to handle this split dynamically, maybe add a codegen script that executes as part of release script
// single icon sheet is too large for percy, need to split them up in chunks of 160 to stay under limit
export const Sheet1 = () => <IconSheet endIndex={160} />;
export const Sheet2 = () => <IconSheet startIndex={160} endIndex={320} />;
