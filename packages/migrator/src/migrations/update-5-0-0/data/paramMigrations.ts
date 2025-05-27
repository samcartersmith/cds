import { ParamMigration } from '../../../helpers';

export const removedParamMigrations: ParamMigration[] = [
  {
    name: 'useCellSpacing',
    path: '@cbhq/cds-common/hooks/useCellSpacing',
    params: ['reduceHorizontalSpacing', 'offsetHorizontal'],
  },
];
