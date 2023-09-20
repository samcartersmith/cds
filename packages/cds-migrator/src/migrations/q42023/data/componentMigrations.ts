import { ComponentMigration } from '../../../helpers';

type RemovedComponent = {
  name: string;
  path: string;
  replacement?: string;
};

const warningText =
  'This component has been replaced by a component with a different API. Please migrate props manually. Refer to go/cds-deprecations for API migration guidance.';

/** Component was replaced with another, API could potentially be different and requires manual migration */
export const oneToOneMigrations: ComponentMigration[] = [
  {
    name: 'FiatIcon',
    path: {
      '@cbhq/cds-mobile/icons/FiatIcon': '@cbhq/cds-mobile/icons/Icon',
    },
    replacement: 'Icon',
    warning: warningText,
  },
];

export const removedComponents: RemovedComponent[] = [
  {
    name: 'Illustration',
    path: '@cbhq/cds-web/illustrations/Illustration',
    replacement: 'use Pictogram, HeroSquare, SpotSquare, or SpotRectangle instead',
  },
  {
    name: 'Illustration',
    path: '@cbhq/cds-mobile/illustrations/Illustration',
    replacement: 'use Pictogram, HeroSquare, SpotSquare, or SpotRectangle instead',
  },
];
