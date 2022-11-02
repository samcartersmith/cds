import { danger, message, warn } from 'danger';
import chainsmoker from 'danger/distribution/commands/utils/chainsmoker';

danger.git.fileMatch = chainsmoker({
  created: danger.git.created_files,
  modified: danger.git.modified_files,
  edited: danger.git.modified_files.concat(danger.git.created_files),
  deleted: danger.git.deleted_files,
});

const bigPRThreshold = 600;
const app = danger.git.fileMatch(
  'packages/**/*.(ts|tsx)',
  // Add ignorable files to the bottom of this list
  // Example: "!**/*.native.(ts|tsx)" would ignore *.native.ts or *.native.tsx files
  '!**/*.test.(ts|tsx)',
  '!**/*.stories.(ts|tsx)',
  '!**/*.d.(ts|tsx)',
  '!**/dangerfile.ts',
  '!**/dangerfile-coverage.ts',
);
const tests = danger.git.fileMatch('**/*.test.(ts|tsx)');
const { pr } = danger.github;
const bodyAndTitle = (pr.body + pr.title).toLowerCase();

// Custom modifiers for people submitting PRs to be able to say "skip this"
const acceptedNoTests = bodyAndTitle.includes('#skip_tests');

// Encourage tests
if (app.edited && !tests.edited && !acceptedNoTests) {
  warn('You have package changes without tests.');
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
