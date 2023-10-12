import { execute } from '../repo/execute.js';
import { spawn } from '../repo/spawn.js';

export const commitChanges = async ({
  message,
  userName,
  userEmail,
}: {
  message: string;
  userName: string;
  userEmail: string;
}) =>
  execute<string>(`Git committing changes with message "${message}"`, async () => {
    return spawn(
      `git config user.name "${userName}" && git config user.email "${userEmail}" && git commit -m "${message}"`,
    );
  });
