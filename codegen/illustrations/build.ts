import { renameKeys, camelCase, pascalCase } from '@cbhq/cds-utils';
import axios from 'axios';
import chalk from 'chalk';
import { getSourcePath } from 'eng/shared/design-system/codegen/utils/getSourcePath';
import fs from 'fs';
import reduce from 'lodash/reduce';
import ora, { Ora } from 'ora';
import path from 'path';

import { FigmaClient, CDS_PERSONAL_ACCESS_TOKEN } from '../figma/client';
import { generateFromTemplate } from '../utils/generateFromTemplate';
import {
  IllustrationSummary,
  IllustrationProps,
  IllustrationComponent,
  IllustrationNamesMap,
} from './interfaces';
import { svgWhitelist } from './svgWhitelist';
import { errMsg, successMsg } from './utils';

const ILLUSTRATION_FILE_ID = 'ay6SCdu5QMjKthzcoPtVOh';
const NODE_ID = '527:531';

type FileFormat = 'svg' | 'png';

const figmaClient = FigmaClient(CDS_PERSONAL_ACCESS_TOKEN);
// Global Data
const manifestData: {
  [fileFormat: string]: { [nodeId: string]: IllustrationSummary };
} = {
  svg: {},
  png: {},
};

const normalizeIllustration = (illustrationName: string): IllustrationProps | void => {
  const [type, spectrum, variant, name] = illustrationName.split('/');

  if (type !== 'Illustration') return undefined;

  return {
    variant: camelCase(variant),
    spectrum: spectrum.toLowerCase(),
    name,
  };
};

const getComponents = async (): Promise<IllustrationComponent | null> => {
  const spinner = ora(
    `Started downloading node ids from ${chalk.bold(ILLUSTRATION_FILE_ID)}`
  ).start();

  const figmaNode = await figmaClient
    .node(ILLUSTRATION_FILE_ID, NODE_ID)
    .catch(err => errMsg(spinner, err.message));
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

const loadOneImage = (
  imageURL: string,
  nodeId: string,
  outDirPath: string,
  spinner: Ora,
  scale: number,
  exportFormat: FileFormat
): Promise<void> => {
  const imageMetadata = manifestData[exportFormat][nodeId];
  const imageName = camelCase(imageMetadata.name);
  const imageOutFullPath = `${outDirPath}/${imageMetadata.spectrum}/${imageName}/`;

  try {
    if (!fs.existsSync(imageOutFullPath)) fs.mkdirSync(imageOutFullPath, { recursive: true });
  } catch (err) {
    errMsg(spinner, err.message);
  }

  const fileName =
    scale === 1 ? `${imageName}.${exportFormat}` : `${imageName}@${scale}x.${exportFormat}`;
  return axios
    .get(imageURL, {
      responseType: exportFormat === 'png' ? 'arraybuffer' : '',
      headers: {
        Accept: exportFormat === 'png' ? 'image/png' : 'image/svg+xml',
      },
    })
    .then(res => {
      if (res) {
        // TODO: Whether the image should be stored on light or dark mode should be determined
        // by Figma
        if (exportFormat === 'svg') {
          fs.writeFileSync(path.join(imageOutFullPath, fileName), res.data);
        } else {
          fs.writeFileSync(
            path.join(imageOutFullPath, fileName),
            Buffer.from(res.data, 'binary'),
            'binary'
          );
        }
        console.log(`Created ${fileName} at ${imageOutFullPath}`);
      }
    })
    .catch(err => {
      errMsg(spinner, err.message);
    });
};

const loadImagesLocally = async (
  nodeIds: string[],
  outDirPath: string,
  exportFormat: FileFormat
): Promise<void> => {
  const spinner = ora(
    `Getting image urls for ${nodeIds.length} illustrations from Figma\n`
  ).start();

  // Defining the different scales we want to illustrations to have
  const SCALE_SIZES = exportFormat === 'png' ? [1, 2, 3] : [1];

  // Create light and dark image directory from the given outDirPath if it
  // does not already exist
  if (!fs.existsSync(`${outDirPath}/light`) && !fs.existsSync(`${outDirPath}/dark`)) {
    fs.mkdirSync(`${outDirPath}/light`, { recursive: true });
    fs.mkdirSync(`${outDirPath}/dark`, { recursive: true });
  }

  await Promise.all(
    SCALE_SIZES.map(async scale => {
      const fileImageResponse = await figmaClient
        .fileImages(ILLUSTRATION_FILE_ID, nodeIds, exportFormat, scale)
        .catch(err => errMsg(spinner, err.message));
      if (!fileImageResponse) return undefined;

      if (fileImageResponse.data.err) {
        errMsg(spinner, fileImageResponse.data.err);
        return undefined;
      }

      // Start downloading images from Figma CDN
      const loadImagePromiseArr = Object.entries(fileImageResponse.data.images).map(info => {
        const [nodeId, imageURL] = info;

        if (!nodeId || !manifestData) return undefined;

        return loadOneImage(imageURL, nodeId, outDirPath, spinner, scale, exportFormat);
      });

      return Promise.all(loadImagePromiseArr);
    })
  );
  spinner.stop();
};

const getIllustrationNamesAndVariants = (
  components: IllustrationComponent
): {
  camelCaseNames: IllustrationNamesMap;
  pascalCaseNames: IllustrationNamesMap;
  variants: string[];
} => {
  const illustrationNames: {
    [variant: string]: Set<string>;
  } = {};
  const variants = new Set<string>();

  Object.entries(components).forEach(component => {
    const [, metadata] = component;
    const props = normalizeIllustration(metadata.name);
    if (!props) return;
    const { name, variant } = props;

    variants.add(variant);

    const variantKey = `${variant}Names`;
    if (variantKey in illustrationNames) {
      illustrationNames[variantKey].add(name);
    } else {
      illustrationNames[variantKey] = new Set([name]);
    }
  });

  const toIllustrationNamesMap = (caseMethod: 'camelcase' | 'pascalcase') =>
    Object.keys(illustrationNames).reduce((acc, variant) => {
      acc[variant] = Array.from(illustrationNames[variant]).map(name => {
        switch (caseMethod) {
          default:
            throw new Error(`usage: ${caseMethod} is invalid.`);
          case 'camelcase':
            return camelCase(name);
          case 'pascalcase':
            return pascalCase(name);
        }
      });
      return acc;
    }, {} as IllustrationNamesMap);

  // Prefix the variants with Illustration, and convert them to pascalCase
  const prefixVariantsWithIllustration = Array.from(variants).map(
    variant => `Illustration${pascalCase(variant)}`
  );

  return {
    camelCaseNames: toIllustrationNamesMap('camelcase'),
    pascalCaseNames: toIllustrationNamesMap('pascalcase'),
    variants: prefixVariantsWithIllustration,
  };
};

const genManifest = async (destPath: string, components: IllustrationComponent) => {
  Object.entries(components).forEach(component => {
    const [nodeId, metadata] = component;

    const props = normalizeIllustration(metadata.name);
    if (!props) return;

    const imgName = camelCase(props.name);

    const isSvg = svgWhitelist.includes(imgName);

    const nodeIdData = {
      variant: `Illustration${pascalCase(props.variant)}`,
      description: metadata.description,
      name: imgName,
      spectrum: props.spectrum,
    };

    if (isSvg) {
      manifestData.svg[nodeId] = nodeIdData;
    } else {
      manifestData.png[nodeId] = nodeIdData;
    }
  });

  generateFromTemplate({
    template: 'objectMap.ejs',
    data: { illustration_manifest: manifestData },
    config: { disableAsConst: true },
    dest: destPath,
  });
};

const createTypes = (names: IllustrationNamesMap) => {
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
          ...renameKeys(names, pascalCaseKeys),
        },
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

const createConstants = (names: IllustrationNamesMap, outPaths: string[]) => {
  try {
    outPaths.forEach(dest =>
      generateFromTemplate({
        template: 'objectMap.ejs',
        dest,
        data: names,
      })
    );
  } catch (err) {
    console.error(err);
  }
};

const getDarkImgPath = (name: string, fileFormat: FileFormat, outFullDirPath: string) => {
  if (fs.existsSync(`${outFullDirPath}/images/dark/${name}/${name}.${fileFormat}`)) {
    return `require("./images/dark/${name}/${name}.${fileFormat}")`;
  }
  return null;
};

const createNameToRelativePathMap = async (names: IllustrationNamesMap, outDirPath: string) => {
  const spinner = ora(`Start creating relative path map`).start();

  const allNames = Object.keys(names).reduce(
    (acc, name) => acc.concat(names[name]),
    [] as string[]
  );

  const outFullDirPath = await getSourcePath(outDirPath);

  const paths = reduce(
    allNames,
    (acc, name) => {
      try {
        const fileFormat = svgWhitelist.includes(name) ? 'svg' : 'png';

        acc[`"${name}"`] = {
          light: `require("./images/light/${name}/${name}.${fileFormat}")`,
          dark: getDarkImgPath(name, fileFormat, outFullDirPath),
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
    }
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

const main = async () => {
  try {
    const components = await getComponents();

    if (!components) return;

    const { camelCaseNames } = getIllustrationNamesAndVariants(components);
    await genManifest('codegen/illustrations/illustration_manifest.ts', components);
    const outDirPath = await getSourcePath('mobile/illustrations/images');

    await loadImagesLocally(Object.keys(manifestData.png), outDirPath, 'png');
    await loadImagesLocally(Object.keys(manifestData.svg), outDirPath, 'svg');
    console.log('All images loaded');
    createTypes(camelCaseNames);
    createConstants(camelCaseNames, ['mobile-playground/src/data/illustrationData.ts']);
    createNameToRelativePathMap(camelCaseNames, 'mobile/illustrations');
  } catch (err) {
    console.error(err);
  }
};

main();
