import { renameKeys, camelCase, pascalCase } from '@cbhq/cds-utils';
import axios from 'axios';
import chalk from 'chalk';
import { getSourcePath } from 'eng/shared/design-system/codegen/utils/getSourcePath';
import fs, { readFileSync, existsSync, renameSync } from 'fs';
import { reduce } from 'lodash';
import ora, { Ora } from 'ora';
import path from 'path';
import { optimize, loadConfig, OptimizeOptions } from 'svgo';

import { FigmaClient, CDS_PERSONAL_ACCESS_TOKEN } from '../figma/client';
import { generateFromTemplate } from '../utils/generateFromTemplate';
import {
  IllustrationSummary,
  IllustrationProps,
  IllustrationComponent,
  IllustrationNamesMap,
  VersionNumManifestStruct,
} from './interfaces';
import { errMsg, successMsg, binaryToBase64, isMetadataEqual } from './utils';
import { manifestData } from './illustration_manifest';
import { blacklist } from './blacklist';

const ILLUSTRATION_FILE_ID = 'ay6SCdu5QMjKthzcoPtVOh';
const NODE_ID = '527:531';

type FileFormat = 'svg' | 'png';
type Spectrum = 'light' | 'dark';

const figmaClient = FigmaClient(CDS_PERSONAL_ACCESS_TOKEN);

const localManifestData: {
  [fileFormat: string]: { [nodeId: string]: IllustrationSummary };
} = manifestData;
let svgOptimizerConfig: OptimizeOptions;
const nameToNodeIdMap: {
  [name: string]: string;
} = {};

function normalizeIllustration(illustrationName: string): IllustrationProps | null {
  const [type, spectrum, variant, name] = illustrationName.split('/');

  if (variant === undefined || spectrum === undefined || name === undefined) {
    console.error('Name on Figma is malformed');
    return null;
  }

  if (type !== 'Illustration') return null;

  return {
    variant: camelCase(variant),
    spectrum: spectrum.toLowerCase(),
    name,
  };
}

/**
 * Tracks whether the image from Figma is different
 * from what we have locally
 */
const fileHasChanged = (oldFileBase64: string, newFileBase64: string): boolean => {
  return oldFileBase64 !== newFileBase64;
};

const loadOneImage = (
  imageURL: string,
  nodeId: string,
  outDirPath: string,
  spinner: Ora,
  scale: number,
  exportFormat: FileFormat,
): Promise<void> => {
  const imageMetadata = localManifestData[exportFormat][nodeId];
  const imageName = imageMetadata.name;
  const { versionNum } = imageMetadata;
  const imageOutFullPath = `${outDirPath}/${imageMetadata.spectrum}/`;

  try {
    if (!fs.existsSync(imageOutFullPath)) fs.mkdirSync(imageOutFullPath, { recursive: true });
  } catch (err) {
    errMsg(spinner, err.message);
  }

  const fileName =
    scale === 1
      ? `${imageName}-${versionNum}.${exportFormat}`
      : `${imageName}-${versionNum}@${scale}x.${exportFormat}`;

  return axios
    .get(imageURL, {
      responseType: exportFormat === 'png' ? 'arraybuffer' : '',
      headers: {
        Accept: exportFormat === 'png' ? 'image/png' : 'image/svg+xml',
      },
    })
    .then(async (res) => {
      if (res) {
        const fileNameFullPath = path.join(imageOutFullPath, fileName);
        const encoding = exportFormat === 'svg' ? 'utf8' : 'binary';
        let oldFileBase64 = '';

        // Tracks whether this image is new, or is modified
        let fileStatus = 'new';

        if (existsSync(fileNameFullPath)) {
          const binaryData = readFileSync(fileNameFullPath, encoding);
          oldFileBase64 = binaryToBase64(binaryData);
          fileStatus = 'modified';
        }

        if (exportFormat === 'svg') {
          const optimizedSVG = optimize(res.data, svgOptimizerConfig);
          fs.writeFileSync(fileNameFullPath, optimizedSVG.data, encoding);
        } else {
          fs.writeFileSync(fileNameFullPath, Buffer.from(res.data, 'binary'), encoding);
        }

        const newFileBase64 = binaryToBase64(readFileSync(fileNameFullPath, encoding));

        if (fileHasChanged(oldFileBase64, newFileBase64)) {
          // Since the file has changed, we need to rename file such that it has the new time
          const newVersionNum = localManifestData[exportFormat][nodeId].versionNum + 1;
          localManifestData[exportFormat][nodeId].versionNum = newVersionNum;
          const newFileName = `${imageName}-${newVersionNum}.${exportFormat}`;
          renameSync(fileNameFullPath, path.join(imageOutFullPath, newFileName));
          console.log(`Created ${newFileName} at ${imageOutFullPath}, File Status: ${fileStatus}`);
        } else {
          console.log(`File: ${fileName} has not changed`);
        }
      }
    })
    .catch((err) => {
      errMsg(spinner, err.message);
    });
};

const getComponents = async (): Promise<IllustrationComponent | null> => {
  const spinner = ora(
    `Started downloading node ids from ${chalk.bold(ILLUSTRATION_FILE_ID)}`,
  ).start();

  // If an error happened here, it should be caught in main
  const figmaNode = await figmaClient.node(ILLUSTRATION_FILE_ID, NODE_ID);
  if (!figmaNode) return null;

  successMsg(spinner, `node ids downloaded`);

  const illustrationFileNode = figmaNode.data.nodes[NODE_ID];

  if (!illustrationFileNode) {
    errMsg(spinner, `node file - ${NODE_ID} is empty`);
    return null;
  }
  spinner.stop();
  return illustrationFileNode.components;
};

// Create light and dark image directory from the given outDirPath if it
// does not already exist
const createNewImgsDirIfDNE = (outDirPath: string) => {
  if (!fs.existsSync(`${outDirPath}/light`) && !fs.existsSync(`${outDirPath}/dark`)) {
    fs.mkdirSync(`${outDirPath}/light`, { recursive: true });
    fs.mkdirSync(`${outDirPath}/dark`, { recursive: true });
  }
};

const loadImagesLocally = async (
  nodeIds: string[],
  outDirPath: string,
  exportFormat: FileFormat,
): Promise<void> => {
  const spinner = ora(
    `Getting image urls for ${nodeIds.length} illustrations from Figma\n`,
  ).start();

  // Defining the different scales we want to illustrations to have
  const SCALE_SIZES = exportFormat === 'png' ? [1, 2, 3] : [1];

  createNewImgsDirIfDNE(outDirPath);

  await Promise.all(
    SCALE_SIZES.map(async (scale) => {
      const fileImageResponse = await figmaClient
        .fileImages(ILLUSTRATION_FILE_ID, nodeIds, exportFormat, scale)
        .catch((err) => errMsg(spinner, err.message));
      if (!fileImageResponse) return undefined;

      if (fileImageResponse.data.err) {
        errMsg(spinner, fileImageResponse.data.err);
        return undefined;
      }

      // Start downloading images from Figma CDN
      const loadImagePromiseArr = Object.entries(fileImageResponse.data.images).map((info) => {
        const [nodeId, imageURL] = info;

        if (!nodeId || !localManifestData) return undefined;

        return loadOneImage(imageURL, nodeId, outDirPath, spinner, scale, exportFormat);
      });

      return Promise.all(loadImagePromiseArr);
    }),
  );
  spinner.stop();
};

/**
 *
 * @param components - Components from Figma
 * @param blacklistOn - if set to true, it will not include the illustrations defined in blacklist.ts. @default false
 * @returns
 */
const getIllustrationNamesAndVariants = (
  components: IllustrationComponent,
  blacklistOn = false,
): {
  camelCaseNames: IllustrationNamesMap;
  pascalCaseNames: IllustrationNamesMap;
  variants: string[];
} => {
  const illustrationNames: {
    [variant: string]: Set<string>;
  } = {};
  const variants = new Set<string>();

  Object.entries(components).forEach((component) => {
    const [, metadata] = component;
    const props = normalizeIllustration(metadata.name);
    if (!props) return;

    if (blacklistOn && blacklist.includes(props.name)) return;

    const { name, variant } = props;

    variants.add(variant);

    const variantKey = `${variant}Names`;
    if (variantKey in illustrationNames) {
      illustrationNames[variantKey].add(name);
    } else {
      illustrationNames[variantKey] = new Set([name]);
    }
  });

  const toIllustrationNamesMap = (caseMethod: 'camelcase' | 'pascalcase') => {
    const names: IllustrationNamesMap = {};
    Object.keys(illustrationNames).forEach((variant) => {
      names[variant] = Array.from(illustrationNames[variant])
        .sort()
        .map((name) => {
          switch (caseMethod) {
            default:
              throw new Error(`usage: ${caseMethod} is invalid.`);
            case 'camelcase':
              return camelCase(name);
            case 'pascalcase':
              return pascalCase(name);
          }
        });
    });
    return names;
  };

  return {
    camelCaseNames: toIllustrationNamesMap('camelcase'),
    pascalCaseNames: toIllustrationNamesMap('pascalcase'),
    variants: Array.from(variants),
  };
};

/**
 * This is different from createManifestFile. This function parses the components
 * passed by Figma, and does some transformation with the information such that it
 * is in the dictionary format that we want.
 * @param components
 * @param restart there are times when we want to update the component metadata regardless of whether
 *                it is in the manifest or not. Setting this to true will allow a total reset. Also, to truly
 *                reset this component. You need to delete all the content in svg inside illustration_manifest.ts
 *                @default false
 * @param blacklistOn if set to true, it will not include illustrations defined in blacklist.ts
 */
const updateManifest = async (
  components: IllustrationComponent,
  restart = false,
  blacklistOn = false,
) => {
  Object.entries(components).forEach((component) => {
    const [nodeId, metadata] = component;
    const props = normalizeIllustration(metadata.name);
    if (!props) return;

    if (blacklistOn && blacklist.includes(props.name)) return;

    const imgName = camelCase(props.name);

    const nodeIdData: IllustrationSummary = {
      variant: props.variant,
      description: metadata.description,
      name: imgName,
      spectrum: props.spectrum,
      versionNum: -1,
    };

    // Update the nameToNodeIdMap
    nameToNodeIdMap[`${imgName}-${props.spectrum}`] = nodeId;

    if (
      !(nodeId in localManifestData.svg) ||
      !isMetadataEqual(localManifestData.svg[nodeId], nodeIdData) ||
      restart
    ) {
      localManifestData.svg[nodeId] = nodeIdData;
    }
  });
};

/**
 * To help monitor the number of illustrations there are,
 * this function will load metadata information to illustration_manifest.
 *
 * Statistics include:
 * - The total number of illustrations from Figma. (Field name: numIllustrations)
 * - Number of illustrations in Pictogram (Field name: pictogramCount)
 * - Number of illustrations in HeroSquare (Field name: heroSquareCount)
 * ....
 *
 * For every variant, there will be a corresponding count
 */
const genStatistics = (destPath: string, names: IllustrationNamesMap) => {
  // A variable to keep track of the number of illustrations in each
  // variant. So it will be
  // {
  //   numPictgrams: x,
  //   numHeroSquare: y,
  //   .....
  // }
  const variantCountMap: {
    [numVariant: string]: number;
  } = {};

  Object.keys(names).forEach((variant) => {
    variantCountMap[variant.replace('Names', 'Count')] = names[variant].length;
  });

  const illustrationMetadata = {
    numIllustrations:
      Object.keys(localManifestData.png).length + Object.keys(localManifestData.svg).length,
    ...variantCountMap,
  };
  generateFromTemplate({
    template: 'objectMap.ejs',
    data: { illustrationMetadata },
    config: { disableAsConst: true },
    dest: destPath,
  });
};

const createManifestFile = (destPath: string) => {
  generateFromTemplate({
    template: 'objectMap.ejs',
    data: { manifestData: localManifestData },
    config: { disableAsConst: true },
    dest: destPath,
  });
};

const createTypes = (names: IllustrationNamesMap, variants: string[]) => {
  const pascalCaseKeys = Object.keys(names).reduce((acc, oldKey) => {
    acc[oldKey] = `Illustration${pascalCase(oldKey)}`;
    return acc;
  }, {} as { [key: string]: string });

  try {
    generateFromTemplate({
      template: 'typescript.ejs',
      dest: 'common/types/Illustration.ts',
      data: {
        types: {
          IllustrationVariant: variants,
          ...renameKeys(names, pascalCaseKeys),
        },
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

const createVersionNumManifest = (destPath: string, fileFormat: FileFormat) => {
  const versionNumManifest: VersionNumManifestStruct = reduce(
    localManifestData[fileFormat],
    (res, metadata) => {
      res[`${metadata.name}-${metadata.spectrum}`] = metadata.versionNum;
      return res;
    },
    {} as VersionNumManifestStruct,
  );

  generateFromTemplate({
    template: 'objectMap.ejs',
    data: { versionNumManifest },
    config: { disableAsConst: true },
    dest: destPath,
  });
};

const createConstants = (names: IllustrationNamesMap, outPaths: string[]) => {
  try {
    outPaths.forEach((dest) =>
      generateFromTemplate({
        template: 'objectMap.ejs',
        dest,
        data: names,
      }),
    );
  } catch (err) {
    console.error(err);
  }
};

const getImgPath = (name: string, fileFormat: FileFormat, spectrum: Spectrum) => {
  const nameAndSpectrum = `${name}-${spectrum}`;
  if (nameAndSpectrum in nameToNodeIdMap) {
    const nodeId = nameToNodeIdMap[`${name}-${spectrum}`];
    return `require("./images/${spectrum}/${name}-${localManifestData[fileFormat][nodeId].versionNum}.${fileFormat}")`;
  }
  return null;
};

const createNameToRelativePathMap = async (names: IllustrationNamesMap, outDirPath: string) => {
  const spinner = ora(`Start creating relative path map`).start();

  const allNames = Object.keys(names).reduce(
    (acc, name) => acc.concat(names[name]),
    [] as string[],
  );

  const paths = reduce(
    allNames,
    (acc, name) => {
      try {
        const fileFormat = 'svg';

        acc[`"${name}"`] = {
          light: getImgPath(name, fileFormat, 'light'),
          dark: getImgPath(name, fileFormat, 'dark'),
          fileFormat: `"${fileFormat}"`,
        };
      } catch (err) {
        errMsg(spinner, err);
      }
      return acc;
    },
    {} as {
      [key: string]: {
        light: string | null;
        dark: string | null;
        fileFormat: string;
      };
    },
  );

  generateFromTemplate({
    template: 'objectMapUnevaled.ejs',
    dest: `${outDirPath}/RelativePathMap.ts`,
    data: {
      IllustrationFilePathMap: paths,
    },
    header: '/* eslint-disable */\n',
  });
  spinner.stop();
};

const main = async (deleteImgsDir = false) => {
  try {
    const svgOptCfgFullPath = await getSourcePath('codegen/configs/svgo.config.js');
    const outDirPath = await getSourcePath('mobile/illustrations/images');

    svgOptimizerConfig = await loadConfig(svgOptCfgFullPath);
    const components = await getComponents();

    // Deletes all the images that are stored locally
    if (deleteImgsDir && fs.existsSync(outDirPath)) {
      fs.rmdirSync(outDirPath, { recursive: true });
    }

    if (!components) return;

    const { camelCaseNames, pascalCaseNames, variants } =
      getIllustrationNamesAndVariants(components);
    await updateManifest(components);
    genStatistics('codegen/illustrations/illustration_statistics.ts', pascalCaseNames);

    await loadImagesLocally(Object.keys(localManifestData.svg), outDirPath, 'svg');
    console.log('All images loaded');
    createTypes(camelCaseNames, variants);
    createConstants(camelCaseNames, [
      'mobile-playground/src/data/illustrationData.ts',
      'website/data/illustrationData.ts',
    ]);
    createNameToRelativePathMap(camelCaseNames, 'mobile/illustrations');
    createManifestFile('codegen/illustrations/illustration_manifest.ts');
    createVersionNumManifest('web/illustrations/versionNumManifest.ts', 'svg');
  } catch (err) {
    console.error(err);
  }
};

main();
