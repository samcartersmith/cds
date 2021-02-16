const linariaPreset = require('linaria/babel');
const path = require('path');
const { argv } = require('yargs');

const linariaConfig = require('../../linaria.config');
const linariaCssExtractPlugin = require('./linariaCssExtractPlugin');

module.exports = (babel, options, cwd) => {
  const preset = linariaPreset(babel, { ...options, ...linariaConfig }, cwd);
  const linariaPlugin = [
    linariaCssExtractPlugin,
    {
      // bazel-out/darwin-fastbuild/bin/eng/shared/design-system/<package>/lib
      outDir: argv.outDir,
      // /private/var/tmp/<hash>/sandbox/darwin-sandbox/execroot/coinbazel/eng/shared/design-system/<package>
      sandboxDir: path.join(cwd, path.basename(argv._[0])),
    },
  ];

  if (preset.plugins) {
    preset.plugins.push(linariaPlugin);
  } else {
    preset.plugins = [linariaPlugin];
  }

  return preset;
};
