/* eslint-disable import/no-extraneous-dependencies */
import { danger, fail, warn } from 'danger';
import chainsmoker from 'danger/distribution/commands/utils/chainsmoker';

import checkForBreakingChanges from './breakingChanges/checkForBreakingChanges';
import checkFilesForRemovedExports from './breakingChanges/exports';
import checkFilesForRemovedParams from './breakingChanges/params';
import { cdsPackagesPatterns, fileIgnorePatterns } from './patterns';
import { findAssociatedFilesWithoutSuffix, findPatternInGitDiffs, getModifiedFiles } from './utils';

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

const pr = danger.github?.pr || MOCK_PR;
const bodyAndTitle = (pr.body + pr.title).toLowerCase();

// Custom modifiers for people submitting PRs to be able to say "skip this"
const acceptedNoTests = bodyAndTitle.includes('#skip_tests');
const acceptedNoStories = bodyAndTitle.includes('#skip_stories');
const acceptedOverrideDeprecation = bodyAndTitle.includes('#skip_deprecations');

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
  `packages/${process.env.NX_PROJECT_NAME}/__stories__/**.(ts|tsx)`,
);

const cdsPackagesFiles = danger.git.fileMatch(...cdsPackagesPatterns);

// Encourage stories
if (nonTestTsxFiles.created && !storyFiles.edited && !acceptedNoStories) {
  warn(
    [
      "## 📕 Don't forget to add stories!",
      `You have added .tsx files in the **${process.env.NX_PROJECT_NAME}** package. Please consider adding **stories** or add \`#skip_stories\` in the PR description to skip this check.\n`,
      findAssociatedFilesWithoutSuffix({
        paths: nonTestTsxFiles.getKeyedPaths().edited,
        targetPaths: storyFiles.getKeyedPaths().edited,
        suffix: 'stories',
      })
        .map((file) => `- ${file}`)
        .join('\n'),
    ].join('\n'),
  );
}

// Encourage tests
if (nonTestTsFiles.edited && !testTsFiles.edited && !acceptedNoTests) {
  warn(
    [
      "## 🧪 Don't forget to add tests!",
      `You have edited files in the **${process.env.NX_PROJECT_NAME}** package. Please consider adding **tests** or add \`#skip_tests\` in the PR description to skip this check.\n`,
      findAssociatedFilesWithoutSuffix({
        paths: nonTestTsFiles.getKeyedPaths().edited,
        targetPaths: testTsFiles.getKeyedPaths().edited,
        suffix: 'test',
      })
        .map((file) => `- ${file}`)
        .join('\n'),
    ].join('\n'),
  );
}

// Look for deprecated in each file that has been touched
void (async () => {
  const deprecations = await findPatternInGitDiffs({
    pattern: /@deprecated/g,
    files: cdsPackagesFiles,
    diffFn: danger.git.diffForFile,
  });

  // Ensure we're not increasing our deprecated footprint
  if (deprecations.modified.length && !acceptedOverrideDeprecation) {
    fail(
      [
        '## 🤨 Did you modify a deprecated component?',
        `You have edited file(s) that contain a deprecation. Make sure the modification you made is not to a deprecated component, token, hook, parameter, prop, or function. Please refer to [go/cds-deprecations](https://cds.cbhq.net/resources/deprecations) for the full list of deprecations.`,
        deprecations.modified.map((file) => `- ${file}`).join('\n'),
      ].join('\n'),
    );
  }
})();

// When testing breaking changes scripts you will have to commit breaking changes before running the scripts
void checkForBreakingChanges({
  files: getModifiedFiles(cdsPackagesFiles),
  checkFn: checkFilesForRemovedExports,
});

void checkForBreakingChanges({
  files: getModifiedFiles(cdsPackagesFiles),
  checkFn: checkFilesForRemovedParams,
});
