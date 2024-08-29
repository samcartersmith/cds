import path from 'node:path';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line import/no-mutable-exports
let dirname: string;

try {
  dirname = __dirname;
} catch (e) {
  dirname = path.dirname(fileURLToPath(import.meta.url));
}

export { dirname };
