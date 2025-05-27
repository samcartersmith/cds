import fs from 'node:fs';

const intro = `# Manual Migrations`;

export const generateManualMigrationOutput = (str: string) => {
  // check if a cds-migrator-output.md file exists at the root of the repo
  const outputFilePath = 'cds-migrator-output.md';
  const outputExists = fs.existsSync(outputFilePath);
  if (outputExists) {
    // if it does, read it and return the contents
    const content = fs.readFileSync(outputFilePath, 'utf-8');
    // append the new content to the end of the file after a line break
    fs.writeFileSync(outputFilePath, `${content}\n\n${str}`);
  } else {
    // if it doesn't, create it and write the new content to it
    fs.writeFileSync(outputFilePath, `${intro}\n\n${str}`);
  }
};
