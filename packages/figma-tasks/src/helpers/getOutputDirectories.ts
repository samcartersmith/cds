export function getOutputDirectories<T>({
  type,
  generatedDirectory,
}: {
  type: T;
  generatedDirectory: string;
}) {
  const typeDir = `${generatedDirectory}/${type}`;

  const dataDir = `${typeDir}/data`;
  const pngDir = `${typeDir}/png`;
  const svgDir = `${typeDir}/svg`;
  const svgJsDir = `${typeDir}/svgJs`;
  const typescriptDir = `${typeDir}/types`;

  return {
    typeDir,
    dataDir,
    pngDir,
    svgDir,
    svgJsDir,
    typescriptDir,
  };
}
