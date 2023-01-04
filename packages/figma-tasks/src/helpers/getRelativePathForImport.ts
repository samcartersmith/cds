import path from 'node:path';

export function getRelativePathForImport(from: string, to: string) {
  const relativePath = path.relative(from, to);
  const ext = path.extname(relativePath);
  return relativePath.replace(ext, '');
}
