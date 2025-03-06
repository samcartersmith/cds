import path from 'node:path';
import fs from 'node:fs';
import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

// Edit the values below to configure the audit
const OLD = 'web';
const NEW = 'cds-web2';

const WHITE_LIST = [
  '/typography/TextTitle4.ts',
  '/typography/TextTitle3.ts',
  '/typography/TextTitle2.ts',
  '/typography/TextTitle1.ts',
  '/typography/TextProps.ts',
  '/typography/TextLegal.ts',
  '/typography/TextLabel2.ts',
  '/typography/TextLabel1.ts',
  '/typography/TextInherited.ts',
  '/typography/TextHeadline.ts',
  '/typography/TextDisplay3.ts',
  '/typography/TextDisplay2.ts',
  '/typography/TextDisplay1.ts',
  '/typography/TextCaption.ts',

  '/system/useThemeProviderStyles.ts',
  '/system/useFeatureFlags.ts',
  '/system/useFeatureFlagUpdater.ts',
  '/system/useFeatureFlag.ts',
  '/system/RootSpectrumProvider.tsx',
  '/system/RootScaleProvider.tsx',
  '/system/FeatureFlagProvider.tsx',
  '/system/FeatureFlagContext.ts',
  '/system/DevicePreferencesProvider.tsx',
  '/system/__tests__/DevicePreferencesProvider.test.tsx',

  '/styles/visuallyHidden.ts',
  '/styles/visibility.ts',
  '/styles/typography.ts',
  '/styles/spectrum.ts',
  '/styles/scale.ts',
  '/styles/responsiveSpacing.ts',
  '/styles/responsive.ts',
  '/styles/position.ts',
  '/styles/pin.ts',
  '/styles/padding.ts',
  '/styles/overflow.ts',
  '/styles/margin.ts',
  '/styles/grid.ts',
  '/styles/gradient.ts',
  '/styles/gap.ts',
  '/styles/foregroundColor.ts',
  '/styles/flex.ts',
  '/styles/display.ts',
  '/styles/disabledState.ts',
  '/styles/borderWidth.ts',
  '/styles/borderRadius.ts',
  '/styles/borderColor.ts',
  '/styles/border.ts',
  '/styles/backgroundColor.ts',

  '/hooks/internal/useInternalSpacingStyles.ts',
  '/hooks/__tests__/useTriggerFocus.test.ts',
  '/hooks/__tests__/useResponsiveCellSpacing.test.ts',
  '/hooks/__tests__/useRemoteImageSrc.test.ts',
  '/hooks/__tests__/useFlushStyles.test.ts',
  '/hooks/__tests__/useElevationStyles.test.tsx',

  '/color',
  '/typography/useTypographyStyles.ts',
  '/typography/textStyles.ts',
  '/typography/createText.tsx',
  '/tables/types/tableTypes.ts',
  '/tables/types/tableSectionTypes.ts',
  '/tables/types/tableRowTypes.ts',
  '/tables/types/tableCellTypes.ts',
  '/tables/types/tableCellFallbackTypes.ts',
  '/tables/types/tableCaptionTypes.ts',
  '/tables/styles/tableStyles.ts',
  '/tables/styles/tableRowStyles.ts',
  '/tables/styles/tableCellStyles.ts',
  '/overlays/tooltipStyles.ts',
  '/overlays/toastStyles.tsx',
  '/overlays/alertStyles.ts',
];

const WHITE_LIST_LOWERCASE = WHITE_LIST.map((s) => s.toLowerCase());

const oldPackagePath = path.resolve(root, `packages/${OLD}/src`);
const newPackagePath = path.resolve(root, `packages/${NEW}/src`);
const oldFiles = globSync(`${oldPackagePath}/**/*`, { nodir: true });
const newFiles = globSync(`${newPackagePath}/**/*`, { nodir: true });
const normalizedOldFiles = oldFiles.map((file) => file.replace(oldPackagePath, ''));
const normalizedOldFilesLowerCase = oldFiles.map((file) =>
  file.replace(oldPackagePath, '').toLowerCase(),
);
const normalizedNewFiles = newFiles.map((file) => file.replace(newPackagePath, ''));
const normalizedNewFilesLowerCase = newFiles.map((file) =>
  file.replace(newPackagePath, '').toLowerCase(),
);
const missingFilesIndexes = normalizedOldFilesLowerCase
  .map((file, index) =>
    !normalizedNewFilesLowerCase.includes(file) &&
    !WHITE_LIST_LOWERCASE.includes(file) &&
    !file.includes('__figma__')
      ? index
      : undefined,
  )
  .filter((item) => item !== undefined);
const missingFiles = missingFilesIndexes.map((index) => normalizedOldFiles[index]);
const resultsPath = path.resolve(root, 'missing-files.json');
const results = JSON.stringify(missingFiles, null, 2);

fs.writeFileSync(resultsPath, results);

console.log(`Audit complete, wrote results to ${resultsPath}`);
