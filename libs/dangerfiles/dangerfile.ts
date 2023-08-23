/* eslint-disable import/no-extraneous-dependencies */
import { danger, fail, message, warn } from 'danger';
import chainsmoker from 'danger/distribution/commands/utils/chainsmoker';

import checkForBreakingChanges from './breakingChanges/checkForBreakingChanges';
import checkFilesForRemovedExports from './breakingChanges/exports';
import checkFilesForRemovedParams from './breakingChanges/params';
import {
  cdsPackagesPatterns,
  componentPatterns,
  fileIgnorePatterns,
  frozenComponentPatterns,
} from './patterns';
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

const bigPRThreshold = 600;

const pr = danger.github?.pr || MOCK_PR;
const bodyAndTitle = (pr.body + pr.title).toLowerCase();

// Custom modifiers for people submitting PRs to be able to say "skip this"
const acceptedNoTests = bodyAndTitle.includes('#skip_tests');
const acceptedNoStories = bodyAndTitle.includes('#skip_stories');
const acceptedOverrideFrozenComponent = bodyAndTitle.includes('#skip_frozen_component');
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
);

const frozenComponentFiles = danger.git.fileMatch(...frozenComponentPatterns);
const componentFiles = danger.git.fileMatch(...componentPatterns);
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

// Acceptance criteria for a new component
if (nonTestTsxFiles.created) {
  message(
    [
      '## ✨ Did you make a new component?',
      '### _Please complete the follow acceptance criteria before asking for a review_',
      'New components are subject to a specific review process. Please complete the following steps: ',
      '1. Schedule a Bug Bash with the entire UI Systems team. Here is a sample [bug bash template](https://github.cbhq.net/frontend/cds/blob/master/docs/contributing/go/cds-bugbash-template) to get you started. ',
      '2. Ask #ask-ui-systems for a PR review',
      '3. New components must meet the following acceptance criteria. Copy and paste the following checklist into the PR description and check off each item as you complete it:',
      '- [ ] Component meets WCAG accessibility standards (can be used with a screen reader, voice or keyboard navigation, etc.)',
      '- [ ] Storybook stories for visual regression',
      '- [ ] Interactive stories if component is interactable',
      '- [ ] Unit tests for all props and states',
      '- [ ] Expected behavior on all devices (Android and IOS) and browsers (Chrome, Safari, Firefox), no runtime errors/warnings, performant in SSR environment, etc.',
      '- [ ] Motion sign off (if applicable)',
    ].join('\n'),
  );
}

// Acceptance criteria for a component modifications
if (componentFiles.edited) {
  message(
    [
      '## 🛠️ Did you make a change to a CDS component?',
      '### _Please complete the follow acceptance criteria before asking for a review_',
      'Component modifications are subject to a specific review process. Please complete the following steps: ',
      '1. Ask #ask-ui-systems for a PR review',
      '2. Use the [CDS Eng Contribution Scope Framework](https://docs.google.com/spreadsheets/u/0/d/1uf6IzEzZst4WvhlLQ-EV5rWQkwHen9lOw9oKMut6PVg/edit) to size the effort, generate acceptance criteria, and required reviewers.',
      '3. Bug bash your change with your PR reviewer. Here is a sample [bug bash template](https://github.cbhq.net/frontend/cds/blob/master/docs/contributing/go/cds-bugbash-template) to get you started. ',
      '4. Component modifications must meet the following acceptance criteria. Copy and paste the following checklist into the PR description and check off each item as you complete it:',
      '- [ ] Component meets WCAG accessibility standards (can be used with a screen reader, voice or keyboard navigation, etc.)',
      '- [ ] Storybook stories for visual regression',
      '- [ ] Interactive stories if component is interactable',
      '- [ ] Unit tests for all props and states',
      '- [ ] Expected behavior on all devices (Android and IOS) and browsers (Chrome, Safari, Firefox), no runtime errors/warnings, performant in SSR environment, etc.',
      '- [ ] Motion sign off (if applicable)',
    ].join('\n'),
  );
}

// Warn against modifying a frozen component
if (frozenComponentFiles.edited && !acceptedOverrideFrozenComponent) {
  fail(
    [
      "## 🥶 Don't modify frozen components!",
      `You have edited file(s) belonging to a **frozen component**. You must qualify for an exception and add \`#skip_frozen_component\` in the PR description to skip this check.\n`,
      frozenComponentFiles
        .getKeyedPaths()
        .edited.map((file) => `- ${file}`)
        .join('\n'),
    ].join('\n'),
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
  const deprecations = await findPatternInGitDiffs({
    pattern: /@deprecated/g,
    files: cdsPackagesFiles,
    diffFn: danger.git.diffForFile,
  });

  // Ensure we're not increasing our deprecated footprint
  if (deprecations.modified.length && !acceptedOverrideDeprecation) {
    fail(
      [
        '## 🛑 Do not modify Deprecations!',
        `You have edited file(s) that contain a deprecation. Make sure the modification you made is not to a deprecated component, token, hook, parameter, prop, or function. Please refer to [go/cds-deprecations](https://cds.cbhq.net/resources/deprecations) for the full list of deprecations.`,
        deprecations.modified.map((file) => `- ${file}`).join('\n'),
      ].join('\n'),
    );
  }

  // Warn when adding deprecations to follow best practices
  if (deprecations.created.length && !acceptedOverrideDeprecation) {
    warn(
      [
        '## 👀 Looks like you marked something as Deprecated!',
        `You have added file(s) that contain a deprecation. Nice! Make sure there is a plan in place to announce this change and delete deprecated code in the next major release. Please refer to [go/cds-deprecations](https://cds.cbhq.net/resources/deprecations) for the full list of deprecations.`,
        deprecations.created.map((file) => `- ${file}`).join('\n'),
      ].join('\n'),
    );
  }

  // Celebrate removing deprecated components
  if (deprecations.deleted.length) {
    message(
      [
        '## 🎉 Thanks for removing deprecated code!',
        `You removed file(s) that contain a deprecation. This calls for a celebration!`,
        deprecations.deleted.map((file) => `- ${file}`).join('\n'),
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
