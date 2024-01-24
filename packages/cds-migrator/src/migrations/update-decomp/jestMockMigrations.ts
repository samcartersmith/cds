import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';
import { SyntaxKind } from 'ts-morph';

import { createMigration, CreateMigrationParams, writeMigrationToFile } from '../../helpers';

import { migrationsWithNewPackages as migrations } from './data/packageDecompMigrations';

const oldDirectories = migrations.map(({ oldDir }) => oldDir);

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  return oldDirectories.some((oldDirectory) => sourceContent.includes(oldDirectory));
};

const callback = (args: CreateMigrationParams) => {
  const { sourceFile } = args;

  const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

  callExpressions.forEach((exp) => {
    const expression = exp.getExpression();
    // Check if the expression is "jest.mock"
    if (
      expression.getKind() === SyntaxKind.PropertyAccessExpression &&
      expression.getText() === 'jest.mock'
    ) {
      const expArgs = exp.getArguments();
      if (expArgs.length > 0) {
        const url = expArgs[0].getText();
        if (oldDirectories.some((dir) => url.includes(dir))) {
          const migrationConfig = migrations.find((mig) => url.includes(mig.oldDir));
          if (migrationConfig) {
            const { oldDir, newDir } = migrationConfig;
            expArgs[0].replaceWithText(`'${newDir}'`);
            writeMigrationToFile({ sourceFile, oldValue: oldDir, newValue: newDir });
          }
        }
      }
    }
  });
};

export default async function migration(tree: Tree) {
  await createMigration({
    tree,
    callback,
    filterSourceFiles,
    onlyTestFiles: true,
  });
}
