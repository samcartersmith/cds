/**
 * Codemod to migrate web or mobile import paths to the common package.
 *
 * Example transformations:
 * Before:
 * import { IconName } from '@cbhq/cds-web';
 *
 * After:
 * import { IconName } from '@cbhq/cds-common';
 */
import { API, ASTPath, FileInfo, ImportDeclaration, Options } from 'jscodeshift';

// Define the mapping for imports that work on both web and mobile platforms
const commonPathMigrationMap: Record<string, string> = {
  IconName: '@cbhq/cds-common',
  HeroSquareName: '@cbhq/cds-common',
  Position: '@cbhq/cds-common',
  LottieStatusAnimationType: '@cbhq/cds-common',
  FlexSpaceCommon: '@cbhq/cds-common',
  FlexAxisValue: '@cbhq/cds-common',
  IllustrationSpotSquareNames: '@cbhq/cds-common',
  IllustrationSpotRectangleNames: '@cbhq/cds-common',
  IllustrationPictogramNames: '@cbhq/cds-common',
  ElevationLevels: '@cbhq/cds-common',
  SpacingProps: '@cbhq/cds-common',
  ChartDataPoint: '@cbhq/cds-common',
  BaseTooltipPlacement: '@cbhq/cds-common',
  NavigationIconName: '@cbhq/cds-common',
};

// Define the mapping for web-only imports
const webOnlyPathMigrationMap: Record<string, string> = {
  IconSize: '@cbhq/cds-common',
  CustomTabProps: '@cbhq/cds-web/tabs/TabNavigation',
};

// Define the mapping for web-only imports
const mobileOnlyPathMigrationMap: Record<string, string> = {
  CustomTabProps: '@cbhq/cds-mobile/tabs/TabNavigation',
};

// Define which packages to check based on platform
const CDS_WEB_PACKAGES = ['@cbhq/cds-web', '@cbhq/cds-common'];
const CDS_MOBILE_PACKAGES = ['@cbhq/cds-mobile', '@cbhq/cds-common'];

function hasCDSImport(sourcePath: string, platform: string): boolean {
  if (platform === 'web') {
    return CDS_WEB_PACKAGES.some((pkg) => sourcePath.startsWith(pkg));
  } else if (platform === 'mobile') {
    return CDS_MOBILE_PACKAGES.some((pkg) => sourcePath.startsWith(pkg));
  }
  return false;
}

function getPathMigrationMap(platform: string): Record<string, string> {
  if (platform === 'web') {
    return { ...commonPathMigrationMap, ...webOnlyPathMigrationMap };
  } else if (platform === 'mobile') {
    return { ...commonPathMigrationMap, ...mobileOnlyPathMigrationMap };
  }
  return {};
}

function getBasePackageName(importPath: string): string {
  // Extract the base package name (e.g., '@cbhq/cds-web' from '@cbhq/cds-web/tabs/TabNavigation')
  const parts = importPath.split('/');
  if (importPath.startsWith('@')) {
    // Scoped package: @scope/package
    return parts.slice(0, 2).join('/');
  } else {
    // Regular package: package-name
    return parts[0];
  }
}

function getImportedNames(importDeclaration: ImportDeclaration): string[] {
  const names: string[] = [];

  if (importDeclaration.specifiers) {
    importDeclaration.specifiers.forEach((specifier) => {
      if (specifier.type === 'ImportSpecifier') {
        const importedName =
          specifier.imported.type === 'Identifier'
            ? specifier.imported.name
            : (specifier.imported as any).name;
        names.push(importedName);
      }
    });
  }

  return names;
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  const platform = options.platform as string | undefined;

  if (!platform || !['web', 'mobile'].includes(platform)) {
    return file.source; // Skip if platform is not specified or invalid
  }

  const pathMigrationMap = getPathMigrationMap(platform);

  // Step 1: Check if there are any @cbhq/cds-web or @cbhq/cds-mobile imports based on platform
  const relevantImports = root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const sourceValue = path.value.source.value;
      return typeof sourceValue === 'string' && hasCDSImport(sourceValue, platform);
    });

  if (relevantImports.length === 0) {
    return file.source; // Skip if no relevant imports found
  }

  // Step 2: Check each import for targeted import types/names and replace paths
  relevantImports.forEach((path: ASTPath<ImportDeclaration>) => {
    const currentSourcePath = path.value.source.value as string;
    const importedNames = getImportedNames(path.value);

    // Check if any imported names match our migration map
    const targetedImports = importedNames.filter((name) =>
      Object.prototype.hasOwnProperty.call(pathMigrationMap, name),
    );

    if (targetedImports.length > 0) {
      // Group imports by their new target path
      const importsByNewPath: Record<string, string[]> = {};
      const remainingImports: string[] = [];

      importedNames.forEach((name) => {
        if (Object.prototype.hasOwnProperty.call(pathMigrationMap, name)) {
          const newPath = pathMigrationMap[name];
          // Skip if the current path is from the same package as the target path
          const currentBasePackage = getBasePackageName(currentSourcePath);
          const targetBasePackage = getBasePackageName(newPath);

          if (currentBasePackage === targetBasePackage) {
            remainingImports.push(name);
          } else {
            if (!importsByNewPath[newPath]) {
              importsByNewPath[newPath] = [];
            }
            importsByNewPath[newPath].push(name);
          }
        } else {
          remainingImports.push(name);
        }
      });

      // Only proceed if there are actually imports to migrate
      if (Object.keys(importsByNewPath).length === 0) {
        return; // Skip this import - nothing to migrate
      }

      // If all imports are being migrated, replace the entire import
      if (remainingImports.length === 0) {
        // If all imports go to the same new path, just update the source
        const newPaths = Object.keys(importsByNewPath);
        if (newPaths.length === 1) {
          path.value.source = j.literal(newPaths[0]);
          modified = true;
        } else {
          // Multiple new paths - need to split the import
          // Replace current import with the first new path
          const firstNewPath = newPaths[0];
          const firstImports = importsByNewPath[firstNewPath];

          // Update current import to first new path with its imports
          path.value.source = j.literal(firstNewPath);
          path.value.specifiers = firstImports.map((name) => j.importSpecifier(j.identifier(name)));

          // Add additional imports for other new paths
          for (let i = 1; i < newPaths.length; i++) {
            const newPath = newPaths[i];
            const imports = importsByNewPath[newPath];
            const newImport = j.importDeclaration(
              imports.map((name) => j.importSpecifier(j.identifier(name))),
              j.literal(newPath),
            );
            // Insert after current import
            j(path).insertAfter(newImport);
          }
          modified = true;
        }
      } else {
        // Some imports remain in original path - need to split
        // Update current import to keep only remaining imports
        path.value.specifiers = remainingImports.map((name) =>
          j.importSpecifier(j.identifier(name)),
        );

        // Add new imports for migrated items
        Object.keys(importsByNewPath).forEach((newPath) => {
          const imports = importsByNewPath[newPath];
          const newImport = j.importDeclaration(
            imports.map((name) => j.importSpecifier(j.identifier(name))),
            j.literal(newPath),
          );
          // Insert after current import
          j(path).insertAfter(newImport);
        });
        modified = true;
      }
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
