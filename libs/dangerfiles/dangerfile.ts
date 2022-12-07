/* eslint-disable no-restricted-globals */
import { danger, fail, message, warn } from 'danger';
import chainsmoker from 'danger/distribution/commands/utils/chainsmoker';

import { findFileDifferences } from './utils';

danger.git.fileMatch = chainsmoker({
  created: danger.git.created_files,
  modified: danger.git.modified_files,
  edited: danger.git.modified_files.concat(danger.git.created_files),
  deleted: danger.git.deleted_files,
});

const bigPRThreshold = 600;

// Add ignorable files to the bottom of this list
// Example: "!**/*.native.(ts|tsx)" would ignore *.native.ts or *.native.tsx files
const fileIgnorePatterns = [
  '!**/*.test.(ts|tsx)',
  '!**/*.stories.(ts|tsx)',
  '!**/*.d.(ts|tsx)',
  '!**/dangerfile.ts',
  '!**/dangerfile-coverage.ts',
  '!**/types/*.ts',
];

/** See go/frozen-components for more info */
const frozenComponentPatterns = [
  'packages/mobile/visualizations/sparkline-interactive/*.(ts|tsx)',
  'packages/mobile/visualizations/sparkline-interactive-header/*.(ts|tsx)',
  'packages/web/dropdown/*.(ts|tsx)',
  'packages/web/overlays/popover/*.(ts|tsx)',
  'packages/common/animation/dropdown.ts',
];

const nonTestTsFiles = danger.git.fileMatch(
  `packages/${process.env.NX_PROJECT_NAME}/**/*.(ts|tsx)`,
  ...fileIgnorePatterns,
);
const testTsFiles = danger.git.fileMatch(
  `packages/${process.env.NX_PROJECT_NAME}/**/*.test.(ts|tsx)`,
);

const nonTestTsxFiles = danger.git.fileMatch(
  `packages/${process.env.NX_PROJECT_NAME}/**/*.tsx`,
  ...fileIgnorePatterns,
);
const storyFiles = danger.git.fileMatch(
  `packages/${process.env.NX_PROJECT_NAME}/**/*.stories.(ts|tsx)`,
);

const frozenComponentFiles = danger.git.fileMatch(...frozenComponentPatterns);

const { pr } = danger.github;
const bodyAndTitle = (pr.body + pr.title).toLowerCase();

// Custom modifiers for people submitting PRs to be able to say "skip this"
const acceptedNoTests = bodyAndTitle.includes('#skip_tests');
const acceptedNoStories = bodyAndTitle.includes('#skip_stories');
const acceptedOverrideFrozenComponent = bodyAndTitle.includes('#skip_frozen_component');

// Encourage stories
if (nonTestTsxFiles.created && !storyFiles.edited && !acceptedNoStories) {
  warn(
    [
      "#### Don't forget to add stories!",
      `You have added .tsx files in the **${process.env.NX_PROJECT_NAME}** package. Please consider adding **stories** or add \`#skip_stories\` in the PR description to skip this check.\n`,
      findFileDifferences(nonTestTsxFiles.getKeyedPaths().edited, storyFiles.getKeyedPaths().edited)
        .map((file) => `- ${file}`)
        .join('\n'),
    ].join('\n'),
  );
}

// Encourage tests
if (nonTestTsFiles.edited && !testTsFiles.edited && !acceptedNoTests) {
  warn(
    [
      "#### Don't forget to add tests!",
      `You have edited files in the **${process.env.NX_PROJECT_NAME}** package. Please consider adding **tests** or add \`#skip_tests\` in the PR description to skip this check.\n`,
      findFileDifferences(nonTestTsFiles.getKeyedPaths().edited, testTsFiles.getKeyedPaths().edited)
        .map((file) => `- ${file}`)
        .join('\n'),
    ].join('\n'),
  );
}

// Warn against modifying a frozen component
if (frozenComponentFiles.edited && !acceptedOverrideFrozenComponent) {
  fail(
    [
      '#### Do no modify frozen components!',
      `You have edited file(s) belonging to a **frozen component**. You must qualify for an exception and add \`#skip_frozen_component\` in the PR description to skip this check.\n`,
      frozenComponentFiles
        .getKeyedPaths()
        .edited.map((file) => `- ${file}`)
        .join('\n'),
    ].join('\n'),
  );
}

// Make sure PR title follows CDS convention
const regex =
  /\[(trivial|CDS-\d{4})\]\s(breaking|feat|change|new|update|fix|patch|chore|types|internal|docs|tests|release)(\(.*\))?:.*/i;

if (!regex.test(pr.title)) {
  warn(
    'Please update your PR title that follows [CDS convention](https://github.cbhq.net/frontend/cds/blob/master/docs/first-pull-request.md).',
  );
}

// Encourage smaller PRs
if (pr.additions + pr.deletions > bigPRThreshold) {
  message(
    'Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.',
  );
}
