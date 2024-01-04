const moduleName = process.argv[2];
const before = Date.now();
// eslint-disable-next-line import/no-dynamic-require, no-unused-vars, @typescript-eslint/no-unused-vars
const importedModule = require(moduleName);
const after = Date.now();
process.send(after - before);
process.exit(0);
