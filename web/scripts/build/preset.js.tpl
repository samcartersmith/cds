const linariaPreset = require('linaria/babel');
const path = require('path');
const fs = require('fs');

const CDS_ROOT = 'eng/shared/design-system/web';

// compose path to linaria.config.js in the bazel sandbox
const sandboxRoot = Array(`{bazel_out}/${CDS_ROOT}`.split('/').length).fill('..').join('/')
const linariaConfig = require(`${sandboxRoot}/${CDS_ROOT}/linaria.config`);
console.log('linariaConfig', linariaConfig)

module.exports = (babel, options, cwd) => {
  const { linaria, ...opts } = options;
  const { plugins = [], ...config } = linariaPreset(babel, { ...linaria, ...linariaConfig }, cwd);

  return {
    ...config,
    plugins: [
      ...plugins,
      [
        // When running with bazel, we first transpile our custom linariaCssExtractPlugin from ts to js. The output is at this directory.
        path.join(cwd, '{bazel_out}', CDS_ROOT, 'babel','linariaCssExtractPlugin'),
        {
          outDir: path.join('{bazel_out}', CDS_ROOT, 'lib'),
          ...opts,
        },
      ],
    ],
    sourceRoot: path.join(CDS_ROOT, 'src'),
  };
};
