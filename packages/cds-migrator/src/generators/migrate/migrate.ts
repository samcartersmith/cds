import { Tree } from '@nrwl/devkit';

import migrateGap from '../../migrations/gap';
import migrateToDecompedPackages from '../../migrations/gondolin';
import gondolin from '../../migrations/gondolin';
import revertDecompedPackages from '../../migrations/revert-decomp';
import migrateTo4_0_0 from '../../migrations/update-4-0-0';
import migrateTo5_0_0 from '../../migrations/update-5-0-0';
import migrateTo6_0_0 from '../../migrations/update-6-0-0';

type MigrateOptions = {
  version: string;
};

async function migrate(tree: Tree, options: MigrateOptions) {
  const { version } = options;

  switch (version) {
    case '4.0.0':
      await migrateTo4_0_0(tree);
      break;

    case '5.0.0':
      await migrateTo5_0_0(tree);
      break;

    case 'package-decomp':
      await migrateToDecompedPackages(tree);
      break;

    case 'revert-decomp':
      await revertDecompedPackages(tree);
      break;

    case '6.0.0':
      await migrateTo6_0_0(tree);
      break;

    case 'gondolin':
      await gondolin(tree);
      break;

    case 'gap':
      await migrateGap(tree);
      break;

    default:
      throw Error('Unexpected: versions is invalid.');
  }
}

export default migrate;
