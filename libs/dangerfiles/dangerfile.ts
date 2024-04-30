/* eslint-disable import/no-extraneous-dependencies */
import { danger, warn } from 'danger';
import chainsmoker from 'danger/distribution/commands/utils/chainsmoker';

import checkForBreakingChanges from './breakingChanges/checkForBreakingChanges';
import checkFilesForRemovedExports from './breakingChanges/exports';
import checkFilesForRemovedParams from './breakingChanges/params';
import { cdsPackagesPatterns, fileIgnorePatterns } from './patterns';
import {
  escapeRegExp,
  findAssociatedFilesWithoutSuffix,
  findPatternInGitDiffs,
  getModifiedFiles,
} from './utils';

// Useful for running locally with yarn danger local --dangerfile libs/dangerfiles/dangerfile.ts
const MOCK_PR = {
  body: 'body to test @deprecations',
  title: '[trivial]: chore: mock pr',
  additions: 10,
  deletions: 5,
};

// ignore feature branches
const targetBranch = danger.github.pr.base.ref;
if (targetBranch !== 'master') {
  process.exit(0);
}

danger.git.fileMatch = chainsmoker({
  created: danger.git.created_files,
  modified: danger.git.modified_files,
  edited: danger.git.modified_files.concat(danger.git.created_files),
  deleted: danger.git.deleted_files,
});

const pr = danger.github?.pr || MOCK_PR;
const bodyAndTitle = (pr.body + pr.title).toLowerCase();

// Custom modifiers for people submitting PRs to be able to say "skip this"
const skipDanger = bodyAndTitle.includes('#skip_danger');
if (skipDanger) {
  const changedFiles = danger.git.modified_files.concat(danger.git.created_files);
  const changedProjects = changedFiles.map((file) => file.split('/')[1]);
  const currentProject = process.env.NX_PROJECT_NAME as string;

  if (changedProjects.includes(currentProject)) {
    warn(
      `Warning: You have chosen to skip danger checks for package/${process.env.NX_PROJECT_NAME} and acknowledge that you are responsible for any regressions introduced by this PR.\n\n` +
        `**Why are you skipping danger checks?** Please provide a rationale in the PR description. For example:\n` +
        `- "I believe it's a false positive and here's why..."\n` +
        `- "I'm intentionally making a breaking change because..."`,
    );
    process.exit(0);
  }
}
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

const cdsPackagesFiles = danger.git.fileMatch(
  ...cdsPackagesPatterns.filter((pattern) =>
    pattern.startsWith(`packages/${process.env.NX_PROJECT_NAME}`),
  ),
);

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
    warn(
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

// Checks if any story files in the 'mobile' package have been deleted or renamed, and fails the check if they have.
if (
  process.env.NX_PROJECT_NAME === 'mobile' ||
  process.env.NX_PROJECT_NAME === 'mobile-visualization'
) {
  void (async () => {
    const storyFilesPattern = new RegExp(
      `^packages/${escapeRegExp(process.env.NX_PROJECT_NAME || '')}/.*\\.stories\\.(ts|tsx)$`,
    );
    const deletedOrRenamedFiles = danger.git.deleted_files
      .concat(danger.git.modified_files)
      .filter((file) => storyFilesPattern.test(file) && !danger.git.created_files.includes(file));

    if (deletedOrRenamedFiles.length) {
      fail(
        [
          '## 📕 Story files deleted or renamed',
          `You have deleted or renamed story files in the **${process.env.NX_PROJECT_NAME}** package. This is a breaking change. Only new additions are allowed. Renames and deletions are not.`,
          deletedOrRenamedFiles.map((file) => `- ${file}`).join('\n'),
        ].join('\n'),
      );
    }
  })();
}
