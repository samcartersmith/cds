// Add ignorable files to the bottom of this list
// Example: "!**/*.native.(ts|tsx)" would ignore *.native.ts or *.native.tsx files
export const fileIgnorePatterns = [
  '!**/*.md',
  '!**/*.ejs.t',
  '!**/*.test.(ts|tsx)',
  '!**/*.stories.(ts|tsx)',
  '!**/*.d.(ts|tsx)',
  '!**/dangerfile.ts',
  '!**/dangerfile-coverage.ts',
  '!**/types/*.ts',
];

export const componentPatterns = [
  'packages/web/**/*.tsx',
  'packages/mobile/**/*.tsx',
  'packages/web-visualization/**/*.tsx',
  'packages/mobile-visualization/**/*.tsx',
];

// publicly facing packages that are related to CDS components
export const cdsPackagesPatterns = [
  'packages/web/**/*.(tsx|ts)',
  'packages/mobile/**/*.(tsx|ts)',
  'packages/common/**/*.(tsx|ts)',
  'packages/web-visualization/**/*.(tsx|ts)',
  'packages/mobile-visualization/**/*.(tsx|ts)',
];
