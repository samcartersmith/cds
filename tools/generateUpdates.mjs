/**
 * Run with `yarn node ./tools/generateUpdates.mjs`
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const outputFilename = 'cds-biweekly-update.md';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT)
  throw Error(
    'Missing MONOREPO_ROOT environment variable, make sure to run this script with `yarn node ./generateUpdates.mjs`',
  );

const outputFile = path.resolve(MONOREPO_ROOT, outputFilename);

const today = new Date();
const twoWeeksAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);

const getCommits = () => {
  const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const twoWeeksAgoString = `${twoWeeksAgo.getFullYear()}-${
    twoWeeksAgo.getMonth() + 1
  }-${twoWeeksAgo.getDate()}`;
  const command = `git log --since='${twoWeeksAgoString}' --until='${todayString}' --pretty=format:"%s - %an" origin/master`;
  const commands = command.split(' ');

  const result = spawnSync(commands.shift(), commands, {
    encoding: 'utf-8',
    shell: true,
  });

  if (result.error) {
    console.error('Error fetching commits:', result.error);
    console.error('stderr:', result.stderr);
    throw result.error;
  } else if (result.stderr) {
    console.log('Git command stderr:', result.stderr);
    return [];
  } else {
    const regexJira = /\[(DX-\d+)\]/g; // Regex to find Jira ticket numbers
    const commits = result.stdout
      .trim()
      .split('\n')
      .map((line) => {
        const parts = line.split(' - ');
        const commitMessage = parts[0].replace(regexJira, (match, ticket) => {
          return `[${ticket}](https://jira.coinbase-corp.com/browse/${ticket})`;
        });
        const authorTime = parts[1];
        return `- ${commitMessage} - ${authorTime}`;
      });
    return commits;
  }
};

const checkChangelogs = () => {
  const changelogDir = path.resolve(MONOREPO_ROOT, 'packages');
  const changelogFolders = fs.readdirSync(changelogDir);
  const latestUpdates = {};

  for (const folder of changelogFolders) {
    const changelogPath = path.join(changelogDir, folder, 'CHANGELOG.md');
    if (fs.existsSync(changelogPath)) {
      const content = fs.readFileSync(changelogPath, 'utf8');

      // The updated regex to build the URL to link to our CDS changelog entry.
      const regex =
        /## (\d+\.\d+\.\d+) \({1,2}(\d+\/\d+\/\d+(?:, \s?\d+:\d+\s?(AM|PM)?)?\s?PST)\){1,2}/gi;

      let match;
      while ((match = regex.exec(content)) !== null) {
        const version = match[1];
        const dateStr = match[2].split(' ')[0].replace(',', '');
        const date = new Date(dateStr);

        if (date > twoWeeksAgo) {
          const versionForUrl = version.replace(/\./g, '');
          let dateForUrl = dateStr
            .replace(/\//g, '')
            .replace(/, /g, '-')
            .replace(/:/g, '')
            .replace(/\s/g, '')
            .toLowerCase();
          dateForUrl = dateForUrl.replace(/pst$/, ''); // Remove trailing 'pst' if it's at the end

          if (!latestUpdates[folder] || new Date(latestUpdates[folder].date) < date) {
            latestUpdates[folder] = {
              version,
              date: dateStr,
              hyperlink: `https://cds.cbhq.net/changelog/${folder}/#${versionForUrl}-${dateForUrl}-pst`,
            };
          }
        }
      }
    }
  }

  const updates = [];
  for (const [folder, info] of Object.entries(latestUpdates)) {
    updates.push(`- [cds-${folder}] [${info.version} (${info.date})](${info.hyperlink})`);
  }

  return updates;
};

const generateReport = () => {
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const dayOfWeek = today.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  let outputContent = [
    `## ${formattedDate}`,
    `Happy ${dayOfWeek} team! I'm happy to share some @ui-systems-team updates from the past two weeks!\n`,
  ];

  const changelogUpdates = checkChangelogs();

  if (changelogUpdates.length > 0) {
    outputContent.push('📢 New Packages');
    changelogUpdates.forEach((update) => {
      outputContent.push(`${update}`);
    });
  } else {
    outputContent.push('📢 No new package updates in the past two weeks.');
  }

  outputContent.push(''); // Add a newline before the Dev Updates section

  try {
    const commits = getCommits();
    outputContent.push('🚀 Dev Updates:');
    if (commits.length > 0) {
      commits.forEach((commit) => {
        // Remove commit hash from the commit string
        const commitMessage = commit.substring(commit.indexOf(' ') + 1);
        outputContent.push(`- ${commitMessage}`);
      });
    } else {
      outputContent.push('No commits found in the past two weeks.');
    }
  } catch (error) {
    console.error('Failed to generate report:', error);
    outputContent.push(`Failed to generate report: ${error}`);
  }

  // Join array into a single string with new lines
  outputContent = outputContent.join('\n');

  // Write the content to the markdown file in the output directory
  fs.writeFileSync(outputFile, outputContent, 'utf8');
  console.log(`Report generated at ${outputFile}`);
};

generateReport();
