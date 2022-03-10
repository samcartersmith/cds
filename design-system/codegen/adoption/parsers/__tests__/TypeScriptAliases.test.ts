import path from 'path';
import { getTypescriptConfig } from '../../utils/getTypescriptConfig';
import { getMatchingDirectory, getTypescriptAliases } from '../../utils/getTypescriptAliases';

async function getAliases() {
  let root = path.join(__dirname, 'project');

  const tsconfig = await getTypescriptConfig(path.join(root, 'tsconfig.json'));
  root = path.resolve(root, tsconfig.compilerOptions.baseUrl);
  return getTypescriptAliases(root, tsconfig);
}

describe('typescript alias tests', () => {
  test('pull from tsconfig.json into directories', async () => {
    const root = path.join(__dirname, 'project');

    const { absoluteAliases, relativeAliases } = await getAliases();

    expect(relativeAliases).toEqual({
      '@test/frontend': 'src',
      '@assethub/www': 'eng/assethub/frontend/www/src',
      '@assethub/admin': 'eng/assethub/frontend/admin/src',
      '@assethub/shared': 'eng/assethub/frontend/shared/src',
      '@commerce/frontend': 'eng/commerce/frontend/src',
      '@cbhq/insto-ui-common': 'eng/prime/shared/components/common',
      '@cbhq/insto-ui-mobile': 'eng/prime/shared/components/mobile',
      '@cbhq/insto-ui-web': 'eng/prime/shared/components/web',
    });

    for (const key of Object.keys(relativeAliases)) {
      expect(absoluteAliases[key]).toEqual(path.join(root, relativeAliases[key]));
    }
  });

  test('pull path from alias that is not in the alias keys', async () => {
    const root = path.join(__dirname, 'project');

    const { absoluteAliases } = await getAliases();

    expect(getMatchingDirectory(absoluteAliases, '@assethub/shared/components')).toEqual(
      path.join(root, 'eng/assethub/frontend/shared/src/components'),
    );

    expect(getMatchingDirectory(absoluteAliases, '@assethub/shared')).toEqual(
      path.join(root, 'eng/assethub/frontend/shared/src'),
    );
  });
});
