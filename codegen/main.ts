import { Type } from './Type/Type';
import { generateFromTemplate, outDirs } from './utils/generateFromTemplate';

const generateStyles = () => {
  // global styles and css variable definitions
  generateFromTemplate({
    template: 'primitives/scale/styles.ejs',
    outRoot: outDirs.web,
    data: Type.scaleCss,
    logInfo: 'scale styles',
  });

  generateFromTemplate({
    template: 'primitives/typography/styles.ejs',
    outRoot: outDirs.web,
    data: Type.css,
    logInfo: 'typography styles',
  });

  Type.updateTextStory();
};

const main = async () => {
  generateStyles();
  generateFromTemplate({
    template: 'components/Text.ejs',
    outRoot: outDirs.web,
    data: Type.pascalCaseConfig,
    logInfo: 'typography components',
    extension: '.tsx',
    shouldCreateFolder: true,
  });
};

main();
