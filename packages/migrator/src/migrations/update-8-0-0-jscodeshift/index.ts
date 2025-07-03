import { API, FileInfo, Options } from 'jscodeshift';

import migrateBasePropsPath from './transforms/migrate-base-props-path';
import migrateBorderRadius from './transforms/migrate-border-radius';
import migrateBorderWidth from './transforms/migrate-border-width';
import migrateButtonAsProp from './transforms/migrate-button-as-prop';
import migrateColors from './transforms/migrate-colors';
import migrateCssVariables from './transforms/migrate-css-variables';
import migrateGeneralPaths from './transforms/migrate-general-paths';
import migrateIcons from './transforms/migrate-icons';
// import migrateDefaultText from './transforms/migrate-default-text';
import migrateMobileComponentProps from './transforms/migrate-mobile-component-props';
import migrateOnKeypressToOnKeydown from './transforms/migrate-onKeyPress-to-onKeyDown';
import migrateOnPressToOnClick from './transforms/migrate-onPress-to-onClick';
import migratePaletteTypes from './transforms/migrate-palette-types';
import migratePaletteValueToCssVar from './transforms/migrate-paletteValueToCssVar';
import migrateRenamedCommonTypes from './transforms/migrate-renamed-common-types';
import migrateRenamedIcons from './transforms/migrate-renamed-icons';
import migrateResponsiveConfig from './transforms/migrate-responsive-config';
import migrateSpacerGapToGap from './transforms/migrate-spacerGap-to-gap';
import migrateSpacingMargin from './transforms/migrate-spacing-margin';
import migrateSpecificPaths from './transforms/migrate-specific-paths';
import migrateUseSpectrum from './transforms/migrate-useSpectrum';
import migrateWebComponentProps from './transforms/migrate-web-component-props';
import migrateWebTokens from './transforms/migrate-web-tokens';

// Define a type for the transform functions for clarity
type TransformFunction = (file: FileInfo, api: API, options: Options) => string;

export default function mainTransform(file: FileInfo, api: API, options: Options) {
  const platform = options.platform as string | undefined;

  if (!platform || !['web', 'mobile'].includes(platform)) {
    console.error(
      `ERROR [${file.path}]: Missing or invalid --platform option for mainTransform. Expected 'web' or 'mobile'. Received: '${platform}'. Skipping all transforms for this file.`,
    );
    return file.source; // Skip all transforms if platform is not correctly specified
  }

  console.log(`INFO [${file.path}]: Running update-8-0-0 transforms for platform: '${platform}'`);

  const transformsToRun: TransformFunction[] = [];

  // This needs to run first to ensure the general paths are migrated before the renamed common types
  transformsToRun.push(migrateGeneralPaths);
  // Base prop path and renamed common types migration
  transformsToRun.push(migrateRenamedCommonTypes);
  transformsToRun.push(migrateBasePropsPath);

  // Platform-specific transforms
  if (platform === 'web') {
    transformsToRun.push(migrateOnPressToOnClick);
    transformsToRun.push(migrateOnKeypressToOnKeydown);
    transformsToRun.push(migrateSpacerGapToGap);
    transformsToRun.push(migrateWebComponentProps);
    transformsToRun.push(migrateButtonAsProp);
    transformsToRun.push(migrateResponsiveConfig);
    transformsToRun.push(migrateCssVariables);
    transformsToRun.push(migrateWebTokens);
    transformsToRun.push(migratePaletteValueToCssVar);
    console.log(`INFO [${file.path}]: Added web-specific transforms.`);
  }

  if (platform === 'mobile') {
    transformsToRun.push(migrateMobileComponentProps);

    console.log(`INFO [${file.path}]: Added mobile-specific transforms.`);
  }

  // General Prop Migrations
  transformsToRun.push(migrateSpacingMargin);
  transformsToRun.push(migrateSpecificPaths);
  transformsToRun.push(migrateColors);
  // Skipping the default text migration script. It should be run separately when needed.
  // transformsToRun.push(migrateDefaultText);
  transformsToRun.push(migrateBorderRadius);
  transformsToRun.push(migrateBorderWidth);
  transformsToRun.push(migratePaletteTypes);
  transformsToRun.push(migrateUseSpectrum);
  // migrateRenamedIcons needs to run first before migrateIcons
  transformsToRun.push(migrateRenamedIcons);
  transformsToRun.push(migrateIcons);

  // Apply all selected transforms in sequence
  let source = file.source;
  for (const transform of transformsToRun) {
    const newSource = transform({ ...file, source }, api, options);
    // Check if the source actually changed to avoid unnecessary parsing if a transform returned original source
    if (newSource !== source) {
      source = newSource;
    }
  }

  return source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
