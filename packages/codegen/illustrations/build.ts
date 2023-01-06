import axios, { AxiosResponse } from 'axios';
import chalk from 'chalk';
import fs, { existsSync, readFileSync, renameSync, unlink } from 'fs';
import { reduce } from 'lodash';
import ora from 'ora';
import path from 'path';
import { loadConfig, optimize, OptimizedSvg, OptimizeOptions } from 'svgo';
import { camelCase, pascalCase, renameKeys } from '@cbhq/cds-utils/index';

import { FileImageResponse } from '../figma/api';
import { FigmaClient } from '../figma/client';
import { createDescriptionGraph } from '../utils/createDescriptionGraph';
import { getSourcePath } from '../utils/getSourcePath';
import { sortByAlphabet } from '../utils/sortAlphabetically';
import { writeFile } from '../utils/writeFile';

import { blacklist } from './blacklist';
import { generateReleaseHistory } from './generateReleaseHistory';
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

const figmaClient = FigmaClient();

const localManifestData: Record<string, Record<string, IllustrationSummary>> = manifestData;
const nameToNodeIdMap: Record<string, string> = {};
let svgOptimizerConfig: OptimizeOptions;
let mobileImagesPath: string;

const newIllustrations: string[] = [];
const modifiedIllustrations: string[] = [];
const deletedIllustrations: Set<string> = new Set([]);

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

  fs.writeFile(outPath, `module.exports = {content:\`${svgStr}\`} `, (err) => {
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

/**
 * If the illustration is deleted on Figma,
 * we need to also delete it locally here.
 *
 * @spectrum - is the svg for dark or light mode
 * @svgFilesPath - the full path the the svgs which is in codege/illustrations/images
 */
const deleteIllustrations = (nodeId: string, svgFilesPath: string) => {
  const metadata = manifestData.svg[nodeId];
  const { versionNum, spectrum, name, variant } = metadata;

  const fileNameWithVersion = `${name}-${versionNum}`;

  // mobileImagesPath is path where all the js files are
  const filesToCheck: string[] = [
    `${mobileImagesPath}/${spectrum}/${fileNameWithVersion}.js`,
    `${svgFilesPath}/${spectrum}/${fileNameWithVersion}.svg`,
  ];

  filesToCheck.forEach((file) => {
    if (fs.existsSync(file)) {
      fs.rm(file, (err) => {
        console.log(chalk.red(`${file} no longer exist in Figma. Deleting...`));

        console.log(chalk.gray(`${nodeId} is being deleted`));

        deletedIllustrations.add(`${variant}/${name}-${spectrum}`);

        if (nodeId in manifestData.svg) {
          delete manifestData.svg[nodeId];
        }

        if (err) {
          throw new Error(err.message);
        }
      });
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
  const { versionNum, spectrum, variant } = imageMetadata;
  const imageOutFullPath = `${outDirPath}/${spectrum}/`;
  const pngOutFullPath = `${outDirPath}/png-${spectrum}/`;
  const jsOutFullPath = `${mobileImagesPath}/${spectrum}/`;
  const svgFilesPath = getSourcePath('packages/codegen/illustrations/images');

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
      const castedErr = err as Error;
      console.error(`${fileName} cannot be fetched - ${castedErr.message}`);

      // TODO: Use error code to check that this error is the right one
      // before we start deleting illustrations
      // only delete illustrations if svg is not available on figma.
      // Don't do this operation if its network issue resulting fetch illustration failure
      if (castedErr.message === `The "url" argument must be of type string. Received null`) {
        deleteIllustrations(nodeId, svgFilesPath);
      }
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
    modifiedIllustrations.push(`${variant}/${nameAndSpectrum}`);
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
      newIllustrations.push(`${variant}/${nameAndSpectrum}`);
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
 * Illustration Build Figma should not have duplicated names
 * otherwise, the name would be overriden. When there are
 * duplicated names, the release will take the svg of the last obtained name
 *
 * If the illustration names are not unique. This will throw an error, halt
 * further operation. Additionally, it will also list out the illustrations
 * that do have duplicated names so our illustrators can remediate this issue.
 * @param components
 */
function checkNamesAreUnique(components: IllustrationComponent) {
  const spectrumNamesMap: Record<string, boolean> = {};
  const duplicatedNames: string[] = [];

  // There are some illustrations that we can't quite
  // figure out why its considered duplicate. We don't
  // see it on Figma. We are skipping this for now, and
  // revisiting the problem later
  const skipNames: Record<string, boolean> = {
    'dark/walletWarning': true,
    'light/walletWarning': true,
  };

  Object.entries(components).forEach((component) => {
    const [, metadata] = component;
    const props = normalizeIllustration(metadata.name);
    if (!props) return;

    const { name, variant, spectrum } = props;
    const spectrumName = `${spectrum}/${name}`;
    const spectrumNameNotInSkipNames = !(spectrumName in skipNames);

    if (spectrumName in spectrumNamesMap && spectrumNameNotInSkipNames) {
      console.log(`Duplicated: ${variant}/${spectrum}/${name}`);
      duplicatedNames.push(`${variant}/${spectrum}/${name}`);
    } else {
      spectrumNamesMap[spectrumName] = true;
    }
  });

  if (duplicatedNames.length > 0) {
    throw new Error(
      `You have duplicated names. Please talk to the illustration to make all names unique.`,
    );
  }
}

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

    // add variant if not already in variant list
    variants.add(variant);

    const variantKey = `${variant}Names`;
    if (variantKey in illustrationNames) {
      // add name to map if variant already there
      illustrationNames[variantKey].add(name.trim());
    } else {
      // create new map w/ variant key
      illustrationNames[variantKey] = new Set([name.trim()]);
    }
  });

  const toIllustrationNamesMap = (caseMethod: 'camelcase' | 'pascalcase') => {
    const names: IllustrationNamesMap = {};
    Object.keys(illustrationNames)
      .sort(sortByAlphabet) // sort variant names (heroRectangle, pictogram, etc)
      .forEach((variant) => {
        names[variant] = Array.from(illustrationNames[variant])
          .sort(sortByAlphabet) // sort icon names
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
      id: nodeId,
      variant: props.variant,
      description: metadata.description,
      name: imgName,
      spectrum: props.spectrum,
      versionNum: -1,
      lastUpdated: metadata.lastUpdated,
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
    newIllustrations: newIllustrations.sort(sortByAlphabet),
    modifiedIllustrations: modifiedIllustrations.sort(sortByAlphabet),
    deletedIllustrations: Array.from(deletedIllustrations).sort(sortByAlphabet),
  };

  await writeFile({
    template: 'objectMap.ejs',
    data: { illustrationMetadata },
    config: { disableAsConst: true },
    dest: destPath,
  });

  return illustrationMetadata;
};

const createManifestFile = async (destPath: string) => {
  await writeFile({
    template: 'objectMap.ejs',
    data: { manifestData: localManifestData },
    config: { disableAsConst: true },
    dest: destPath,
    types: {
      manifestData:
        'Record<string, Record<string, {id: string;variant: string;description: string;name: string;spectrum: string;versionNum: number;lastUpdated: string;}>>',
    },
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
      dest: 'packages/common/types/IllustrationNames.ts',
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
  // sort function to sort by lastUpdated date
  const sortByLastUpdated = (
    [, prevMetadata]: [string, IllustrationSummary],
    [, nextMetadata]: [string, IllustrationSummary],
  ) => {
    const prevDate = new Date(prevMetadata.lastUpdated).valueOf();
    const nextDate = new Date(nextMetadata.lastUpdated).valueOf();

    return prevDate - nextDate;
  };

  // sort manifest lastUpdated & restore into map
  const sortedManifestByLastUpdated = Object.fromEntries(
    Object.entries(localManifestData[FILE_FORMAT]).sort(sortByLastUpdated),
  );

  // create key value pairs with ordered manifest
  const versionNumManifest: VersionNumManifestStruct = reduce(
    sortedManifestByLastUpdated,
    (res, metadata) => {
      res[`${metadata.name}-${metadata.spectrum}`] = metadata.versionNum;
      return res;
    },
    {} as VersionNumManifestStruct,
  );

  // generate versionNumManifest, order determines sortedIllustrationData order.
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
const outputImgBasedOnMostRecentlyUpdated = (outPaths: string[]) => {
  // Loop through localManifestData, and put variants that are the same
  // in the same hash-key. The sortedImgGroupedByVariantMap will look
  // something like this:
  // {
  //    pictogram: ['illoName1-dark', illoName2-light',
  //               'illoName3-dark', .....],
  //    spotSquare: [..an array of illo....],
  //    spotRectangle: [...an array of illo.....]
  // }
  const sortedImgGroupedByVariantMap: Record<string, string[]> = Object.entries(
    localManifestData.svg,
  ).reduce((res, [nodeId]) => {
    const { variant, name, spectrum } = localManifestData.svg[nodeId];
    const nameAndSpectrum = `${name}-${spectrum}`;

    if (variant in res) {
      res[variant].push(nameAndSpectrum);
      res[variant] = res[variant].sort(sortByAlphabet);
    } else {
      res[variant] = [nameAndSpectrum];
    }

    return res;
  }, {} as Record<string, string[]>);

  try {
    for (const dest of outPaths) {
      writeFile({
        template: 'objectMap.ejs',
        dest,
        data: {
          sortedImg: sortedImgGroupedByVariantMap,
        },
        config: {
          disableAsConst: true,
        },
        types: {
          sortedImg: 'Record<string, string[]>',
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

  const paths = allNames.sort(sortByAlphabet).reduce(
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
    const svgOptCfgFullPath = getSourcePath('packages/codegen/configs/svgo.config.js');
    const outDirPath = getSourcePath('packages/codegen/illustrations/images');
    mobileImagesPath = getSourcePath('packages/mobile/illustrations/images');

    svgOptimizerConfig = await loadConfig(svgOptCfgFullPath);
    const components = await getComponents();

    // Deletes all the images that are stored locally
    if (deleteImgsDir && fs.existsSync(outDirPath)) {
      fs.rmdirSync(outDirPath, { recursive: true });
    }

    if (!components) return;

    // Get Components w/ Metadata
    const {
      data: {
        meta: { components: componentsWithMetadata },
      },
    } = await figmaClient.components(ILLUSTRATION_FILE_ID);

    // add lastUpdated to manifest data
    componentsWithMetadata.forEach((cmptData) => {
      if (components[cmptData.node_id]) {
        components[cmptData.node_id].lastUpdated = cmptData.updated_at;
      }
    });

    // First check that every illustration have a unique name.
    // If it doesn't, then don't bother doing anything else cause
    // it will break it anyways
    checkNamesAreUnique(components);

    const { camelCaseNames, pascalCaseNames, variants } =
      getIllustrationNamesAndVariants(components);

    await updateManifest(components);

    await loadImagesLocally(Object.keys(localManifestData.svg), outDirPath);
    await genStatistics(
      'packages/codegen/illustrations/illustration_statistics.ts',
      pascalCaseNames,
    );

    const deletedIllustrationsArr = Array.from(deletedIllustrations);
    await generateReleaseHistory('apps/website/static/data/illustration/releaseHistory.json', {
      newIllustrations,
      modifiedIllustrations,
      deletedIllustrations: deletedIllustrationsArr,
    });

    console.log('All images loaded');
    await createTypes(camelCaseNames, variants);
    await createConstants(camelCaseNames, ['packages/common/internal/data/illustrationData.ts']);
    await createMobileSpectrumMap(camelCaseNames, 'packages/mobile/illustrations');
    await createManifestFile('packages/codegen/illustrations/illustration_manifest.ts');
    const versionNumManifest = await createVersionNumManifest(
      'packages/web/illustrations/versionNumManifest.ts',
    );
    await createIllustrationDescriptionGraph(
      'packages/common/internal/data/illustrationDescriptionGraph.ts',
    );
    checkLightModeExistsForAllAssets(versionNumManifest);

    outputImgBasedOnMostRecentlyUpdated([
      'packages/common/internal/data/sortedIllustrationData.ts',
    ]);
  } catch (err) {
    console.error(err);
  }
};

main().catch((err) => console.error(err));
