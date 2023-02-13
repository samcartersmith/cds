/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-globals */
import { danger, fail, message, warn } from 'danger';
import chainsmoker from 'danger/distribution/commands/utils/chainsmoker';

import { findFileDifferences, findPatternInFile } from './utils';

// Useful for running locally with yarn danger local --dangerfile libs/dangerfiles/dangerfile.ts
const MOCK_PR = {
  body: 'body to test @deprecations',
  title: '[trivial]: chore: mock pr',
  additions: 10,
  deletions: 5,
};

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

const pr = danger.github?.pr || MOCK_PR;
const bodyAndTitle = (pr.body + pr.title).toLowerCase();

// Custom modifiers for people submitting PRs to be able to say "skip this"
const acceptedNoTests = bodyAndTitle.includes('#skip_tests');
const acceptedNoStories = bodyAndTitle.includes('#skip_stories');
const acceptedOverrideFrozenComponent = bodyAndTitle.includes('#skip_frozen_component');
const acceptedOverrideDeprecation = bodyAndTitle.includes('#skip_deprecations');

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
      "#### Don't modify frozen components!",
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
  /\[(trivial|DX-\d{4}|CDS-\d{4})\]\s(breaking|feat|change|new|update|fix|patch|chore|types|internal|docs|tests|release)(\(.*\))?:.*/i;

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

// Look for deprecated in each file that has been touched
void (async () => {
  const deprecations = await findPatternInFile({
    pattern: /@deprecated/g,
    files: danger.git.modified_files,
    diffFn: danger.git.diffForFile,
  });

  // Ensure we're not increasing our deprecated footprint
  if (deprecations.modified.length && !acceptedOverrideDeprecation) {
    fail(
      [
        '#### Do not modify Deprecations!',
        `You have edited file(s) that contain a deprecation. Make sure the modification you made is not to a deprecated component, token, hook, parameter, prop, or function. Please refer to [go/cds-deprecations](https://cds.cbhq.net/resources/deprecations) for the full list of deprecations.`,
        deprecations.modified.map((file) => `- ${file}`).join('\n'),
      ].join('\n'),
    );
  }

  // Warn when adding deprecations to follow best practices
  if (deprecations.added.length && !acceptedOverrideDeprecation) {
    warn(
      [
        '#### Looks like you marked something as Deprecated!',
        `You have added file(s) that contain a deprecation. Nice! Make sure there is a plan in place to announce this change and delete deprecated code in the next major release. Please refer to [go/cds-deprecations](https://cds.cbhq.net/resources/deprecations) for the full list of deprecations.`,
        deprecations.added.map((file) => `- ${file}`).join('\n'),
      ].join('\n'),
    );
  }

  // Celebrate removing deprecated components
  if (deprecations.removed.length) {
    message(
      [
        '#### 🎉 Thanks for removing deprecated code!',
        `You removed file(s) that contain a deprecation. This calls for a celebration!`,
        deprecations.removed.map((file) => `- ${file}`).join('\n'),
      ].join('\n'),
    );
  }
})();
