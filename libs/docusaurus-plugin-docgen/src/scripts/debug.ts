import path from 'path';

import { docgenRunner } from './docgenRunner';

const sourceFiles = [
  'accordion/Accordion',
  'accordion/AccordionItem',
  'layout/Box',
  'layout/HStack',
  'layout/VStack',
  'layout/Group',
  'buttons/Button',
  'buttons/ButtonGroup',
  'system/Pressable',
  'system/PressableOpacity',
  'cells/Cell',
  'cells/CellAccessory',
  'cells/CellDetail',
  'cells/CellMedia',
  'cells/ListCell',
  'cells/ListCellFallback',
  'cells/ContentCell',
  'cells/ContentCellFallback',
  'controls/Checkbox',
];

async function debug() {
  const pluginDir = path.join(__dirname, '../..');
  const testsDir = path.join(pluginDir, '__tests__');
  const webDir = path.join(pluginDir, '../web');
  const mobileDir = path.join(pluginDir, '../mobile');
  const webTsconfig = path.join(webDir, 'tsconfig.json');
  const mobileTsconfig = path.join(mobileDir, 'tsconfig.json');
  const docs = await docgenRunner({
    entryPoints: [webTsconfig, mobileTsconfig],
    sourceFiles,
    docsDir: path.join(testsDir, 'docs'),
    pluginDir: path.join(testsDir, '.docusaurus'),
  });
  console.log(docs);
}

void debug();
