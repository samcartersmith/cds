import type { API, FileInfo, Options } from 'jscodeshift';

import { logMigrationError } from './helpers/error-logger';
import baseTransform from './transforms/base-transform';
// component related transforms
import migrateBasePropsImportPath from './transforms/migrate-base-props-import-path';
import migrateBorderRadius from './transforms/migrate-border-radius';
import migrateBorderWidth from './transforms/migrate-border-width';
import migrateButtonAsProp from './transforms/migrate-button-as-prop';
import migrateCellSpacing from './transforms/migrate-cell-spacing';
import migrateColors from './transforms/migrate-colors';
// types related transforms
import migrateCommonTypeImportPaths from './transforms/migrate-common-types-import-paths';
import migrateCssVariables from './transforms/migrate-css-variables'; // TODO: This is a web specific transform, add cds-web package check for this transform
import migrateDefaultText from './transforms/migrate-default-text'; // TODO: This is optional for Text components. Add this to options.misc only if user wants to run this transform.
import migrateElevatedComponents from './transforms/migrate-elevated-components';
import migrateIconImportPaths from './transforms/migrate-icon-paths';
import migrateIconTypes from './transforms/migrate-icon-types';
import migrateIcons from './transforms/migrate-icons';
import migrateMobileComponentProps from './transforms/migrate-mobile-component-props';
import migrateMobileImportPaths from './transforms/migrate-mobile-import-paths';
import migrateOnKeyPressToOnKeyDown from './transforms/migrate-onKeyPress-to-onKeyDown';
import migrateOnPressToOnClick from './transforms/migrate-onPress-to-onClick';
import migratePaletteTypes from './transforms/migrate-palette-types';
import migratePaletteValueToCssVar from './transforms/migrate-paletteValueToCssVar';
import migrateRemoteImage from './transforms/migrate-RemoteImage';
import migrateRenamedCommonTypes from './transforms/migrate-renamed-common-types';
import migrateRenamedIcons from './transforms/migrate-renamed-icons';
import migrateResponsiveConfig from './transforms/migrate-responsive-config';
import migrateSpacerGapToGap from './transforms/migrate-spacerGap-to-gap';
import migrateSpacingOffsetToPaddingMargin from './transforms/migrate-spacing-offset-to-padding-margin';
import migrateSparklineInteractiveStrokeColor from './transforms/migrate-sparkline-interactive-strokeColor';
import migrateTextDisplay from './transforms/migrate-text-display';
// hooks transforms
import migrateUseAccessibleForeground from './transforms/migrate-useAccessibleForeground';
import migrateUseLineHeightMap from './transforms/migrate-useLineHeightMap';
import migrateUseSpectrum from './transforms/migrate-useSpectrum';
import migrateUseToast from './transforms/migrate-useToast';
import migrateWebComponentProps from './transforms/migrate-web-component-props';
// path migration transforms
import migrateWebImportPaths from './transforms/migrate-web-import-paths';
import migrateWebTokens from './transforms/migrate-web-tokens';
import promoteImports from './transforms/promote-imports';

type TransformFunction = (file: FileInfo, api: API, options: Options) => string | undefined;

const boxTransforms: TransformFunction[] = [
  migrateBasePropsImportPath,
  migrateBorderRadius,
  migrateBorderWidth,
  migrateColors,
  migrateOnPressToOnClick,
  migrateOnKeyPressToOnKeyDown,
  migrateResponsiveConfig,
  migrateSpacingOffsetToPaddingMargin,
];

const textTransforms: TransformFunction[] = [
  ...boxTransforms,
  migrateTextDisplay,
  migrateWebComponentProps,
  migrateMobileComponentProps,
];

const linkAndButtonTransforms: TransformFunction[] = [...textTransforms, migrateButtonAsProp];

const cellTransforms: TransformFunction[] = [
  ...boxTransforms,
  migrateWebComponentProps,
  migrateCellSpacing,
];

const iconTransforms: TransformFunction[] = [migrateRenamedIcons, migrateIcons];

export const hookTransformMap: Record<string, TransformFunction> = {
  useAccessibleForeground: migrateUseAccessibleForeground,
  useLineHeightMap: migrateUseLineHeightMap,
  useSpectrum: migrateUseSpectrum,
  useToast: migrateUseToast,
};

export const importTransformMap: Record<string, TransformFunction> = {
  commonTypeImportPaths: migrateCommonTypeImportPaths,
  webImportPaths: migrateWebImportPaths,
  mobileImportPaths: migrateMobileImportPaths,
  iconImportPaths: migrateIconImportPaths,
};

export const typeTransformMap: Record<string, TransformFunction> = {
  renamedCommonTypes: migrateRenamedCommonTypes,
  iconTypes: migrateIconTypes,
  paletteTypes: migratePaletteTypes,
};

export const miscTransformMap: Record<string, TransformFunction> = {
  paletteValueToCssVar: migratePaletteValueToCssVar,
  cssVariables: migrateCssVariables,
  webTokens: migrateWebTokens,
};

const importPathTransforms: TransformFunction[] = [migrateWebImportPaths, migrateMobileImportPaths];

export const allTransforms: TransformFunction[] = [
  migrateRenamedIcons,
  migrateIcons,
  ...linkAndButtonTransforms,
  migrateCommonTypeImportPaths, // this script needs to run first before migrateRenamedCommonTypes
  migrateRenamedCommonTypes,
  migrateWebImportPaths,
  migrateMobileImportPaths,
  migrateIconImportPaths,
  migrateIconTypes,
  migrateUseAccessibleForeground,
  migrateUseLineHeightMap,
  migrateUseSpectrum,
  migrateUseToast,
  migratePaletteValueToCssVar,
  migrateCssVariables,
  migrateWebTokens,
  migratePaletteTypes,
  migrateCellSpacing,
  migrateSparklineInteractiveStrokeColor,
];

// TODO: Add a step to end of each list to remove 'v7/' subdirectory from import paths
export const componentTransformMap: Record<string, TransformFunction[]> = {
  Avatar: [...boxTransforms],
  AvatarButton: linkAndButtonTransforms,
  Banner: [...boxTransforms, ...iconTransforms, ...importPathTransforms],
  Box: [...boxTransforms, migrateElevatedComponents],
  Button: [...linkAndButtonTransforms, ...iconTransforms],
  Card: [...boxTransforms, ...linkAndButtonTransforms],
  Cell: cellTransforms,
  CellMedia: [migrateBasePropsImportPath, ...iconTransforms],
  Checkbox: [],
  ContentCell: cellTransforms,
  ContentCellFallback: cellTransforms,
  Divider: [...boxTransforms],
  Fallback: boxTransforms,
  FullscreenModal: [migrateWebImportPaths],
  Grid: [...boxTransforms, migrateElevatedComponents],
  HeroSquare: [migrateBasePropsImportPath],
  HStack: [...boxTransforms, migrateSpacerGapToGap, migrateElevatedComponents],
  Icon: [...iconTransforms, migrateColors],
  IconButton: [...linkAndButtonTransforms, ...iconTransforms],
  InputLabel: textTransforms,
  InputIcon: [...boxTransforms, ...iconTransforms],
  InputIconButton: [...linkAndButtonTransforms, ...iconTransforms],
  Link: linkAndButtonTransforms,
  ListCell: cellTransforms,
  ListCellFallback: cellTransforms,
  Modal: [...importPathTransforms],
  ModalBody: [...importPathTransforms],
  ModalFooter: [...importPathTransforms],
  ModalHeader: [...importPathTransforms, migrateOnPressToOnClick],
  ModalWrapper: [migrateWebImportPaths],
  NativeTextArea: [migrateOnPressToOnClick],
  Pictogram: [migrateBasePropsImportPath],
  Pressable: linkAndButtonTransforms,
  PressableOpacity: linkAndButtonTransforms,
  Radio: [],
  RadioGroup: [migrateBasePropsImportPath],
  RemoteImage: [migrateBasePropsImportPath, migrateColors, migrateRemoteImage],
  SearchInput: [migrateBasePropsImportPath, migrateOnPressToOnClick],
  Select: [migrateBasePropsImportPath, migrateOnPressToOnClick],
  SelectOption: [...boxTransforms, migrateWebComponentProps],
  Spacer: [], // only needs to run promoteImports
  SpotIcon: [migrateBasePropsImportPath],
  SpotRectangle: [migrateBasePropsImportPath],
  SpotSquare: [migrateBasePropsImportPath],
  Switch: [],
  TextBody: textTransforms,
  TextCaption: textTransforms,
  TextDisplay1: textTransforms,
  TextDisplay2: textTransforms,
  TextDisplay3: textTransforms,
  TextHeadline: textTransforms,
  TextInherited: textTransforms,
  TextLabel1: textTransforms,
  TextLabel2: textTransforms,
  TextLegal: textTransforms,
  TextTitle1: textTransforms,
  TextTitle2: textTransforms,
  TextTitle3: textTransforms,
  TextTitle4: textTransforms,
  TextInput: [migrateBasePropsImportPath, migrateOnPressToOnClick, migrateBorderRadius],
  Tooltip: [...importPathTransforms, migrateWebComponentProps, migrateMobileComponentProps],
  TooltipContent: [migrateWebImportPaths],
  Tray: [migrateMobileImportPaths],
  VStack: [...boxTransforms, migrateSpacerGapToGap, migrateElevatedComponents],
};

export default function mainTransform(file: FileInfo, api: API, options: Options) {
  const componentName = options['component'] as string | undefined;
  const hookName = options['hook'] as string | undefined;
  const importTransformName = options['importTransform'] as string | undefined;
  const typeTransformName = options['typeTransform'] as string | undefined;
  const miscTransformName = options['miscTransform'] as string | undefined;
  const transformType = options['transform-type'] as string;

  // Handle component-specific migration
  if (transformType === 'component' && componentName) {
    const transformsToRun =
      componentTransformMap[componentName as keyof typeof componentTransformMap];
    if (transformsToRun.length) {
      console.log(
        `INFO [${file.path}]: Running incremental migration for component: '${componentName}'`,
      );
      let source = file.source;
      for (const transform of [...transformsToRun, promoteImports]) {
        try {
          const newSource = transform({ ...file, source }, api, options);
          if (newSource && newSource !== source) {
            source = newSource;
          }
        } catch (error) {
          logMigrationError(file.path, transform.name, error);
        }
      }
      return source;
    } else {
      console.warn(
        `WARN [${file.path}]: No component migration found for '${componentName}'. Skipping.`,
      );
      return file.source;
    }
  }

  if (transformType === 'hooks' && hookName) {
    const transformToRun = hookTransformMap[hookName];
    if (transformToRun) {
      console.log(`INFO [${file.path}]: Running incremental migration for hook: '${hookName}'`);
      let source = file.source;
      for (const transform of [transformToRun, promoteImports]) {
        try {
          const newSource = transform({ ...file, source }, api, options);
          if (newSource && newSource !== source) {
            source = newSource;
          }
        } catch (error) {
          logMigrationError(file.path, transform.name, error);
        }
      }
      return source;
    } else {
      console.warn(`WARN [${file.path}]: No hook migration found for '${hookName}'. Skipping.`);
      return file.source;
    }
  }

  if (transformType === 'imports' && importTransformName) {
    const transformToRun = importTransformMap[importTransformName];
    if (transformToRun) {
      console.log(
        `INFO [${file.path}]: Running incremental migration for import: '${importTransformName}'`,
      );
      let source = file.source;
      for (const transform of [transformToRun, promoteImports]) {
        try {
          const newSource = transform({ ...file, source }, api, options);
          if (newSource && newSource !== source) {
            source = newSource;
          }
        } catch (error) {
          logMigrationError(file.path, transform.name, error);
        }
      }
      return source;
    } else {
      console.warn(
        `WARN [${file.path}]: No import migration found for '${importTransformName}'. Skipping.`,
      );
      return file.source;
    }
  }

  if (transformType === 'types' && typeTransformName) {
    const transformToRun = typeTransformMap[typeTransformName];
    if (transformToRun) {
      console.log(
        `INFO [${file.path}]: Running incremental migration for type: '${typeTransformName}'`,
      );
      let source = file.source;
      for (const transform of [transformToRun, promoteImports]) {
        try {
          const newSource = transform({ ...file, source }, api, options);
          if (newSource && newSource !== source) {
            source = newSource;
          }
        } catch (error) {
          logMigrationError(file.path, transform.name, error);
        }
      }
      return source;
    } else {
      console.warn(
        `WARN [${file.path}]: No type migration found for '${typeTransformName}'. Skipping.`,
      );
      return file.source;
    }
  }

  if (transformType === 'misc' && miscTransformName) {
    const transformToRun = miscTransformMap[miscTransformName];
    if (transformToRun) {
      console.log(
        `INFO [${file.path}]: Running incremental migration for miscellaneous: '${miscTransformName}'`,
      );
      let source = file.source;
      for (const transform of [transformToRun, promoteImports]) {
        try {
          const newSource = transform({ ...file, source }, api, options);
          if (newSource && newSource !== source) {
            source = newSource;
          }
        } catch (error) {
          logMigrationError(file.path, transform.name, error);
        }
      }
      return source;
    } else {
      console.warn(
        `WARN [${file.path}]: No miscellaneous migration found for '${miscTransformName}'. Skipping.`,
      );
      return file.source;
    }
  }

  let transformsToRun: TransformFunction[];
  let transformDescription: string;

  switch (transformType) {
    case 'base':
      console.log(`INFO [${file.path}]: Running base transform`);
      try {
        return baseTransform(file, api, options);
      } catch (error) {
        logMigrationError(file.path, baseTransform.name, error);
        return file.source; // Return original source on error to prevent crashing
      }
    case 'everything':
    default:
      transformsToRun = [...allTransforms, promoteImports];
      transformDescription = 'everything';
      break;
  }

  console.log(`INFO [${file.path}]: Running ${transformDescription} transforms.`);
  let source = file.source;
  for (const transform of transformsToRun) {
    try {
      const newSource = transform({ ...file, source }, api, options);
      if (newSource && newSource !== source) {
        source = newSource;
      }
    } catch (error) {
      logMigrationError(file.path, transform.name, error);
    }
  }
  return source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
