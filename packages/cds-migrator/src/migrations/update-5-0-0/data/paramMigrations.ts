type ParamMigration = {
  name: string;
  path: string;
  params: string[];
};

export const removedParamMigrations: ParamMigration[] = [
  {
    name: 'useCellSpacing',
    path: '@cbhq/cds-common/hooks/useCellSpacing',
    params: ['reduceHorizontalSpacing', 'offsetHorizontal'],
  },
];
