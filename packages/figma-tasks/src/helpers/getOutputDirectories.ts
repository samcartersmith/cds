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
  const typesDir = `${typeDir}/types`;

  return {
    dataDir,
    pngDir,
    svgDir,
    svgJsDir,
    typesDir,
  };
}
