import axios, { AxiosResponse } from 'axios';
import chalk from 'chalk';
import fs, { existsSync, readFileSync, renameSync, unlink } from 'fs';
import { reduce } from 'lodash';
import ora from 'ora';
import path from 'path';
import { loadConfig, optimize, OptimizedSvg, OptimizeOptions } from 'svgo';
import { camelCase, pascalCase, renameKeys } from '@cbhq/cds-utils/index';

import { FileImageResponse } from '../figma/api';
import { CDS_PERSONAL_ACCESS_TOKEN, FigmaClient } from '../figma/client';
import { createDescriptionGraph } from '../utils/createDescriptionGraph';
import { getSourcePath } from '../utils/getSourcePath';
import { writeFile } from '../utils/writeFile';

import { blacklist } from './blacklist';
import { manifestData } from './illustration_manifest';
import {
  IllustrationComponent,
  IllustrationNamesMap,
  IllustrationProps,
  IllustrationSummary,
  VersionNumManifestStruct,
} from './interfaces';
import { modified } from './modified';
import {
  binaryToBase64,
  errMsg,
  fromVersionManifestKey,
  isMetadataEqual,
  successMsg,
} from './utils';

const ILLUSTRATION_FILE_ID = 'ay6SCdu5QMjKthzcoPtVOh';
const NODE_ID = '3972:345';
const FILE_FORMAT = 'svg';

type Spectrum = 'light' | 'dark';
type FileFormat = 'png' | 'svg' | 'js';

const figmaClient = FigmaClient(CDS_PERSONAL_ACCESS_TOKEN);

const localManifestData: Record<string, Record<string, IllustrationSummary>> = manifestData;
const nameToNodeIdMap: Record<string, string> = {};
let svgOptimizerConfig: OptimizeOptions;
let mobileImagesPath: string;

const newIllustrations: string[] = [];
const modifiedIllustrations: string[] = [];

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

// Converts an svg into an xml string.
// Outputs it into a js in an object so it can be exported
const createSvgXML = (data: {
  outPath: string;
  svgStr: string;
  fileName: string;
  fileStatus: string;
}) => {
  const { outPath, svgStr, fileName, fileStatus } = data;

  fs.writeFile(outPath, `/* eslint-disable */ module.exports = {content:\`${svgStr}\`} `, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Created ${fileName} at ${outPath}, File Status: ${fileStatus}`);
    }
  });
};

const deleteSvgXML = (deletePath: string) => {
  if (fs.existsSync(deletePath)) {
    // Will first delete the old JS File before creating a new one
    unlink(deletePath, (err) => {
      if (err) throw err;
      console.log(`${deletePath} was deleted`);
    });
  }
};

const createFileName = (fileName: string, versionNum: number, fileFormat: FileFormat) => {
  return `${fileName}-${versionNum}.${fileFormat}`;
};

// If the file has changed, it writes the new svg output to a
// new file, and name has to be changed to reflect the new version.
// This does that for you
const renameFileWithNewVersion = (data: {
  imageName: string;
  fileNameFullPath: string;
  imageOutFullPath: string;
  nodeId: string;
}): {
  newFileName: string;
  newVersionNum: number;
} => {
  const { imageName, fileNameFullPath, imageOutFullPath, nodeId } = data;
  // Since the file has changed, we need to rename file such that it has the new time
  const newVersionNum = localManifestData[FILE_FORMAT][nodeId].versionNum + 1;
  localManifestData[FILE_FORMAT][nodeId].versionNum = newVersionNum;
  const newFileName = createFileName(imageName, newVersionNum, FILE_FORMAT);
  renameSync(fileNameFullPath, path.join(imageOutFullPath, newFileName));
  return {
    newFileName,
    newVersionNum,
  };
};

const downloadPNG = async (pngURL: string, fileName: string, outFullPath: string) => {
  // get request for png
  const pngRes = await axios
    .get(pngURL, {
      responseType: 'arraybuffer',
      headers: {
        Accept: 'image/png',
      },
    })
    .catch((err) => {
      console.error(`${fileName} cannot be fetched. Reason: ${err.message}`);
    });

  if (!pngRes) return;

  fs.writeFile(outFullPath, pngRes.data as never, { encoding: 'binary' }, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};

const loadOneImage = async (
  svgURL: string,
  pngURL: string,
  nodeId: string,
  outDirPath: string,
): Promise<void> => {
  const imageMetadata = localManifestData[FILE_FORMAT][nodeId];
  const imageName = imageMetadata.name;
  const { versionNum, spectrum } = imageMetadata;
  const imageOutFullPath = `${outDirPath}/${spectrum}/`;
  const pngOutFullPath = `${outDirPath}/png-${spectrum}/`;
  const jsOutFullPath = `${mobileImagesPath}/${spectrum}/`;

  try {
    if (!fs.existsSync(imageOutFullPath)) fs.mkdirSync(imageOutFullPath, { recursive: true });
    if (!fs.existsSync(jsOutFullPath)) fs.mkdirSync(jsOutFullPath, { recursive: true });
    if (!fs.existsSync(pngOutFullPath)) fs.mkdirSync(pngOutFullPath, { recursive: true });
  } catch (err) {
    console.error((err as Error).message);
  }

  const fileName = createFileName(imageName, versionNum, FILE_FORMAT);

  // get request for svg
  const svgRes = await axios
    .get(svgURL, {
      responseType: '',
      headers: {
        Accept: 'image/svg+xml',
      },
    })
    .catch((err) => {
      console.error(`${fileName} cannot be fetched - ${(err as Error).message}`);
    });

  if (!svgRes) return;

  const fileNameFullPath = path.join(imageOutFullPath, fileName);

  const nameAndSpectrum = `${imageName}-${spectrum}`;
  const ENCODING = 'utf8';
  let oldFileBase64 = '';

  // Tracks whether this image is new, or is modified
  let fileStatus = 'new';

  if (existsSync(fileNameFullPath)) {
    const binaryData = readFileSync(fileNameFullPath, ENCODING);
    oldFileBase64 = binaryToBase64(binaryData);
    fileStatus = 'modified';
  }

  // Due to some weird issues with keeping track of
  // modified illustrations. We have to manually
  // track which files are modified. We will have to
  // specify modified files in modified.ts, and then
  // it will get added to the modifiedIllustrations array
  if (modified.includes(nameAndSpectrum)) {
    modifiedIllustrations.push(nameAndSpectrum);
  }

  /** Disable this if statement and enable createSvgXML. And you
   * will be able recreate every js file regardless of whether it has been modified or not */
  if (fileStatus === 'modified' && !modified.includes(nameAndSpectrum)) return;

  const optimizedSVG = optimize(String(svgRes.data), svgOptimizerConfig);
  fs.writeFileSync(fileNameFullPath, (optimizedSVG as OptimizedSvg).data, ENCODING);

  /** Enable to recreate all the js files  */
  // createSvgXML({
  //   outPath: jsFileNameFullPath,
  //   svgStr: optimizedSVG.data,
  //   fileName: jsFileName,
  //   fileStatus,
  // });

  const newFileBase64 = binaryToBase64(readFileSync(fileNameFullPath, ENCODING));

  if (fileHasChanged(oldFileBase64, newFileBase64)) {
    const { newFileName, newVersionNum } = renameFileWithNewVersion({
      imageName,
      fileNameFullPath,
      imageOutFullPath,
      nodeId,
    });
    const newJsFileName = createFileName(imageName, newVersionNum, 'js');
    const oldJsFileName = createFileName(imageName, newVersionNum - 1, 'js');
    const newJsOutFullPath = path.join(jsOutFullPath, newJsFileName);
    const oldJsOutFullPath = path.join(jsOutFullPath, oldJsFileName);

    // Will first delete the old JS File before creating a new one
    // Otherwise the newest and older versions will coexist in the package.
    // We only want to keep the newest version in the package
    deleteSvgXML(oldJsOutFullPath);

    // You only need to create a new svgXML string if
    // the illustration was changed or it is new.
    createSvgXML({
      outPath: newJsOutFullPath,
      svgStr: (optimizedSVG as OptimizedSvg).data,
      fileName: newJsFileName,
      fileStatus,
    });

    const pngFileName = createFileName(imageName, newVersionNum, 'png');
    await downloadPNG(pngURL, pngFileName, path.join(pngOutFullPath, pngFileName));

    if (fileStatus === 'new') {
      newIllustrations.push(nameAndSpectrum);
    }

    console.log(`Created ${newFileName} at ${newJsOutFullPath}, File Status: ${fileStatus}`);
    console.log(`Created ${pngFileName} at ${pngOutFullPath}, File Status: ${fileStatus}`);
  } else {
    console.log(`File: ${fileName} has not changed`);
  }
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

const streamIllustrations = async (nodeIds: string[], fileFormat: 'svg' | 'png') => {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  const promises: Promise<void | AxiosResponse<FileImageResponse>>[] = [];
  const CHUNK_SIZE = 50;

  for (let i = 0; i < nodeIds.length - 1; i += CHUNK_SIZE) {
    const nodeIdsSubset = nodeIds.slice(i, i + CHUNK_SIZE);

    promises.push(
      figmaClient
        .fileImages(ILLUSTRATION_FILE_ID, nodeIdsSubset, fileFormat, 1)
        .catch((err) => console.error(err.message)),
    );
  }
  const resolvedPromises = await Promise.all(promises);

  let svgImages: Record<string, string> = {};

  resolvedPromises.forEach((promise) => {
    if (!promise) {
      return;
    }

    if (promise.data.err) {
      throw new Error(`${promise?.data} - Image is not laoding`);
    }

    svgImages = {
      ...svgImages,
      ...promise.data.images,
    };
  });

  return svgImages;
};

const loadImagesLocally = async (nodeIds: string[], outDirPath: string) => {
  console.log(`Getting image urls for ${nodeIds.length} illustrations from Figma\n`);
  createNewImgsDirIfDNE(outDirPath);

  const svgImageResponse = await streamIllustrations(nodeIds, 'svg');
  const pngImageResponse = await streamIllustrations(nodeIds, 'png');

  const svgResponseKeys = Object.keys(svgImageResponse);
  const pngResponseKeys = Object.keys(pngImageResponse);

  if (svgResponseKeys.length !== pngResponseKeys.length) {
    console.error('Number of SVGs does not equal number of PNGs');
    return undefined;
  }

  // Start downloading images from Figma CDN
  const loadImagePromiseArr = [];
  for (const [nodeId] of Object.entries(svgImageResponse)) {
    const svgURL = svgImageResponse[nodeId];
    const pngURL = pngImageResponse[nodeId];

    if (!nodeId || !localManifestData) return undefined;

    loadImagePromiseArr.push(loadOneImage(svgURL, pngURL, nodeId, outDirPath));
  }

  return Promise.all(loadImagePromiseArr);
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
  const illustrationNames: Record<string, Set<string>> = {};
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
      illustrationNames[variantKey].add(name.trim());
    } else {
      illustrationNames[variantKey] = new Set([name.trim()]);
    }
  });

  const toIllustrationNamesMap = (caseMethod: 'camelcase' | 'pascalcase') => {
    const names: IllustrationNamesMap = {};
    Object.keys(illustrationNames).forEach((variant) => {
      names[variant] = Array.from(illustrationNames[variant])
        .sort()
        .map((name) => {
          switch (caseMethod) {
            case 'camelcase':
              return camelCase(name);
            case 'pascalcase':
              return pascalCase(name);
            default:
              throw new Error(`usage: ${caseMethod} is invalid.`);
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

    const nameAndSpectrum = `${imgName}-${props.spectrum}`;

    // Update the nameToNodeIdMap
    nameToNodeIdMap[nameAndSpectrum] = nodeId;

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
const genStatistics = async (destPath: string, names: IllustrationNamesMap) => {
  // A variable to keep track of the number of illustrations in each
  // variant. So it will be
  // {
  //   numPictgrams: x,
  //   numHeroSquare: y,
  //   .....
  // }
  const variantCountMap: Record<string, number> = {};

  Object.keys(names).forEach((variant) => {
    variantCountMap[variant.replace('Names', 'Count')] = names[variant].length;
  });

  const illustrationMetadata = {
    numIllustrations: Object.keys(localManifestData.svg).length,
    ...variantCountMap,
    newIllustration: newIllustrations.sort(),
    modifiedIllustrations: modifiedIllustrations.sort(),
  };

  await writeFile({
    template: 'objectMap.ejs',
    data: { illustrationMetadata },
    config: { disableAsConst: true },
    dest: destPath,
  });
};

const createManifestFile = async (destPath: string) => {
  await writeFile({
    template: 'objectMap.ejs',
    data: { manifestData: localManifestData },
    config: { disableAsConst: true },
    dest: destPath,
  });
};

const createTypes = async (names: IllustrationNamesMap, variants: string[]) => {
  const pascalCaseKeys = Object.keys(names).reduce((acc, oldKey) => {
    acc[oldKey] = `Illustration${pascalCase(oldKey)}`;
    return acc;
  }, {} as Record<string, string>);

  try {
    await writeFile({
      template: 'typescript.ejs',
      dest: 'common/types/IllustrationNames.ts',
      data: {
        types: {
          IllustrationVariant: variants,
          ...renameKeys(names, pascalCaseKeys),
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const createVersionNumManifest = async (destPath: string): Promise<VersionNumManifestStruct> => {
  const versionNumManifest: VersionNumManifestStruct = reduce(
    localManifestData[FILE_FORMAT],
    (res, metadata) => {
      res[`${metadata.name}-${metadata.spectrum}`] = metadata.versionNum;
      return res;
    },
    {} as VersionNumManifestStruct,
  );

  await writeFile({
    template: 'objectMap.ejs',
    data: { versionNumManifest },
    config: { disableAsConst: true },
    dest: destPath,
    types: {
      versionNumManifest: 'Record<string, number>',
    },
  });
  return versionNumManifest;
};

const checkLightModeExistsForAllAssets = (versionNumManifest: VersionNumManifestStruct) => {
  let errored = false;

  for (const key of Object.keys(versionNumManifest)) {
    const { name, spectrum } = fromVersionManifestKey(key);

    if (spectrum === 'dark' && !(`${name}-light` in versionNumManifest)) {
      console.error(`${name} only has dark mode version. Please add a light mode version`);
      errored = true;
    }
  }

  if (errored) {
    throw Error(
      'Some of these assets are missing light mode illustrations. Please add them to Figma',
    );
  }
};

// Super long name, but at least you know exactly what
// this function does 🐒🐒🐒
const outputImgBasedOnMostRecentlyUpdated = (
  versionNumManifest: VersionNumManifestStruct,
  outPaths: string[],
) => {
  try {
    for (const dest of outPaths) {
      writeFile({
        template: 'objectMap.ejs',
        dest,
        data: {
          sortedImg: Object.keys(versionNumManifest),
        },
      }).catch((err) => console.error(err));
    }
  } catch (err) {
    console.error(err);
  }
};

const createConstants = async (names: IllustrationNamesMap, outPaths: string[]) => {
  try {
    await Promise.all(
      outPaths.map(async (dest) =>
        writeFile({
          template: 'objectMap.ejs',
          dest,
          data: names,
        }),
      ),
    );
  } catch (err) {
    console.error(err);
  }
};

const getImgPath = (name: string, spectrum: Spectrum) => {
  const nameAndSpectrum = `${name}-${spectrum}`;
  if (nameAndSpectrum in nameToNodeIdMap) {
    const nodeId = nameToNodeIdMap[`${name}-${spectrum}`];
    return `require("./images/${spectrum}/${name}-${localManifestData[FILE_FORMAT][nodeId].versionNum}")`;
  }
  return null;
};

const createMobileSpectrumMap = async (names: IllustrationNamesMap, outDirPath: string) => {
  const spinner = ora(`Start creating relative path map`).start();

  const allNames = Object.keys(names).reduce(
    (acc, name) => acc.concat(names[name]),
    [] as string[],
  );

  const paths = reduce(
    allNames,
    (acc, name) => {
      try {
        acc[`"${name}"`] = {
          light: getImgPath(name, 'light'),
          dark: getImgPath(name, 'dark'),
        };
      } catch (err) {
        errMsg(spinner, (err as Error).message);
      }
      return acc;
    },
    {} as Record<
      string,
      {
        light: string | null;
        dark: string | null;
      }
    >,
  );

  await writeFile({
    template: 'mobile/illustrationSpectrumMap.ejs',
    dest: `${outDirPath}/illustrationSpectrumMap.ts`,
    data: {
      illustrationSpectrumMap: paths,
    },
    config: {
      disablePrettier: true,
    },
  });

  spinner.stop();
};

const createIllustrationDescriptionGraph = async (destPath: string) => {
  const illustrationDescriptionGraph = createDescriptionGraph(localManifestData.svg);
  await writeFile({
    template: 'objectMap.ejs',
    data: { illustrationDescriptionGraph },
    config: { disableAsConst: true },
    types: {
      illustrationDescriptionGraph: 'Record<string, string[]>',
    },
    dest: destPath,
  });
};

const main = async (deleteImgsDir = false) => {
  try {
    const svgOptCfgFullPath = await getSourcePath('codegen/configs/svgo.config.js');
    const outDirPath = await getSourcePath('codegen/illustrations/images');
    mobileImagesPath = await getSourcePath('mobile/illustrations/images');

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

    await loadImagesLocally(Object.keys(localManifestData.svg), outDirPath);
    await genStatistics('codegen/illustrations/illustration_statistics.ts', pascalCaseNames);

    console.log('All images loaded');
    await createTypes(camelCaseNames, variants);
    await createConstants(camelCaseNames, ['common/internal/data/illustrationData.ts']);
    await createMobileSpectrumMap(camelCaseNames, 'mobile/illustrations');
    await createManifestFile('codegen/illustrations/illustration_manifest.ts');
    const versionNumManifest = await createVersionNumManifest(
      'web/illustrations/versionNumManifest.ts',
    );
    await createIllustrationDescriptionGraph(
      'common/internal/data/illustrationDescriptionGraph.ts',
    );
    checkLightModeExistsForAllAssets(versionNumManifest);

    outputImgBasedOnMostRecentlyUpdated(versionNumManifest, [
      'common/internal/data/sortedIllustrationData.ts',
    ]);
  } catch (err) {
    console.error(err);
  }
};

main().catch((err) => console.error(err));
