import { exec } from 'child_process';

import { formatString } from '../scripts/docgenParser';

type Log = {
  sha: string;
  date: string;
  author: string;
  commit: string;
  commitUrl?: string;
  tocDate: string;
  pr?: string;
};

function trimScopeOrPr(str: string) {
  return str.replace('(', '').replace(')', '').replace('#', '');
}

export async function getGitInfoForFile({
  file,
  repoUrl: repoPrefix,
}: {
  file: string;
  repoUrl?: string;
}): Promise<Log[]> {
  return new Promise((resolve, reject) => {
    exec(
      `git --no-pager log --follow --pretty=format:'%h||%at||%an||%s' -- ${file}`,
      (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }

        const logs = String(stdout)
          .split('\n')
          .map((line) => {
            const [sha, date, author, commit] = line.split('||');
            const message = commit.replace(/\(([^()]*)\)/gm, '').trim();
            const scopeAndPr = (commit.match(/\(([^()]*)\)/gm) as [string, string]) ?? [''];
            let pr = trimScopeOrPr(scopeAndPr[0]);
            if (scopeAndPr.length > 1) {
              pr = trimScopeOrPr(scopeAndPr[1]);
            }

            return {
              sha,
              date: `${new Date(Number(date) * 1000).toLocaleString('en-US', {
                timeZone: 'America/Los_Angeles',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })} PST`,
              author,
              commit: formatString(message),
              commitUrl: repoPrefix ? `${repoPrefix}/commit/${sha}` : undefined,
              tocDate: `${new Date(Number(date) * 1000).toLocaleString('en-US', {
                timeZone: 'America/Los_Angeles',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}`,
              pr,
            };
          });

        resolve(logs);
      },
    );
  });
}
