import { fallbackStack } from '@cb/design-system-web/styles/shared';

import { typography } from './Type/config';
import { Type } from './Type/Type';
import { generateFromTemplate, outDirs } from './utils/generateFromTemplate';

const generateStyles = () => {
  const { genericTypeStyles, allTypeStyles } = Type.generateClasses();

  // global styles and css variable definitions
  generateFromTemplate({
    template: 'primitives/scale/styles.ejs',
    outRoot: outDirs.web,
    data: {
      scaleStyles: allTypeStyles,
    },
    logInfo: 'scale styles',
  });

  generateFromTemplate({
    template: 'primitives/typography/styles.ejs',
    outRoot: outDirs.web,
    data: {
      fallbackStack,
      styleObjects: genericTypeStyles,
    },
    logInfo: 'typography styles',
  });

  Type.updateTextStory();
};

const main = async () => {
  generateStyles();
  generateFromTemplate({
    template: 'components/Text.ejs',
    outRoot: outDirs.web,
    data: { typography },
    logInfo: 'typography components',
    extension: '.tsx',
    shouldCreateFolder: true,
  });
};

main();
