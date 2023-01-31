const shell = require('child_process').execSync;
const path = require('node:path');

const OUTPUT_SUB_DIRECTORY = 'templates';

/**
 * https://packemon.dev/docs/advanced#customizing-babel-swc-and-rollup
 * Custom config file to ensure all image assets are included in deployed package.
 * By default packemon does not handle this for us.
 */
module.exports = {
  rollupOutput(config) {
    /** Copy ejs templates to build output since packemon ignores special files by default */
    const src = path.join(__dirname, `src/${OUTPUT_SUB_DIRECTORY}`);
    const dist = path.join(config.dir, `${OUTPUT_SUB_DIRECTORY}`);

    shell(`mkdir -p ${dist}`);
    shell(`cp -r ${src}/* ${dist}`);
  },
};
