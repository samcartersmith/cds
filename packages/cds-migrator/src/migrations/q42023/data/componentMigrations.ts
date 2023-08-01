type ComponentMigration = {
  name: string;
  path: Record<string, string>;
  replacement?: string;
  warning?: string;
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
