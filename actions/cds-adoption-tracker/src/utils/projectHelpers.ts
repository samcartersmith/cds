import fs from 'node:fs';
import path from 'node:path';
import { Project } from 'ts-morph';

export function createProject(tsConfigFilePath: string): [Project, string] {
  const project = new Project({
    tsConfigFilePath,
    skipAddingFilesFromTsConfig: true,
  });

  const projectRoot = path.dirname(tsConfigFilePath);

  const includePattern = `${projectRoot}/**/*.{ts,tsx}`;
  const excludePatterns = [
    '**/node_modules/**',
    '**/esm/**',
    '**/cjs/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/out/**',
    '**/coverage/**',
    '**/tmp/**',
    // Exclude test and story files to reduce memory usage
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/__tests__/**',
    '**/__mocks__/**',
    '**/*.stories.ts',
    '**/*.stories.tsx',
    '**/__stories__/**',
    '**/*.d.ts',
    '**/fixtures/**',
    '**/testUtils/**',
  ];

  project.addSourceFilesAtPaths([
    includePattern,
    ...excludePatterns.map((pattern) => `!${pattern}`),
  ]);

  return [project, projectRoot];
}

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

export function loadPackageJson(projectPath: string): PackageJson {
  try {
    const packageJsonPath = path.resolve(projectPath, 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
    return JSON.parse(packageJsonContent);
  } catch (error) {
    console.error('Error loading package.json:', error);
    return {};
  }
}

export function getPackageJsonDependencies(
  packageJson: PackageJson,
): [Set<unknown>, Record<string, string>] {
  const allDependencies = new Set();
  const cdsVersions: Record<string, string> = {};
  let cdsVersionsFound = false;
  for (const dependency of Object.keys(packageJson.dependencies ?? {})) {
    if ((packageJson.dependencies?.[dependency] ?? '').includes('workspace:^')) continue;
    if (dependency.includes('cds')) {
      cdsVersions[dependency] = packageJson.dependencies?.[dependency] ?? '';
      cdsVersionsFound = true;
    }
    allDependencies.add(dependency);
  }
  for (const dependency of Object.keys(packageJson.devDependencies ?? {})) {
    if ((packageJson.devDependencies?.[dependency] ?? '').includes('workspace:^')) continue;
    if (dependency.includes('cds')) {
      cdsVersions[dependency] = packageJson.devDependencies?.[dependency] ?? '';
      cdsVersionsFound = true;
    }
    allDependencies.add(dependency);
  }
  for (const dependency of Object.keys(packageJson.peerDependencies ?? {})) {
    if ((packageJson.peerDependencies?.[dependency] ?? '').includes('workspace:^')) continue;
    if (!cdsVersionsFound && dependency.includes('cds')) {
      cdsVersions[dependency] = packageJson.peerDependencies?.[dependency] ?? '';
    }
    allDependencies.add(dependency);
  }
  allDependencies.add('react');
  allDependencies.add('react-native');
  console.log('CDS Versions: ', cdsVersions);
  return [allDependencies, cdsVersions];
}
