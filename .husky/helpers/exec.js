const shell = require('shelljs');

/**
 * Creates a new shell and executes a given command in that shell
 * @link https://itnext.io/writing-custom-git-hooks-with-nodejs-2d53732865aa
 */
function exec(cmd, options) {
  const defaultOptions = { silent: true };
  let output = shell.exec(cmd, { ...defaultOptions, ...(options || {}) });
  if (options && options.toString !== false) {
    output = output.toString();
    output = options.trim ? output.trim() : output;
  }

  return output;
}

exports.exec = exec;
