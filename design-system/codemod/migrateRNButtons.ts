// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemod/migrateRNButtons.ts ./src

import migrateComponentButtons from './factory/migrateComponentProps';

export default migrateComponentButtons('@components/interactables/Button', {
  width: {
    rename: 'block',
    values: [
      // width="100%" -> block
      {
        from: '100%',
        to: undefined,
      },
    ],
  },
  isLoading: {
    rename: 'loading',
    values: [
      // isLoading={true} -> loading
      {
        from: true,
        to: undefined,
      },
    ],
  },
});
