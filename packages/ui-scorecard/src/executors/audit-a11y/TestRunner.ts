import execa from 'execa';

import { TestTask } from './TestTask';

export class TestRunner extends TestTask {
  /**
   * Run jest using the jest configurations in
   * the project that this executor is ran on
   * @param args jest parameters
   * @returns
   */
  public async runJest(args: string[]) {
    const execResult = await execa('jest', args, {
      cwd: this.getTask.projectPath,
      env: {
        ...this.getTask.context.target?.env,
        ...this.getTask.getEnvVars(),
      },
      preferLocal: true,
    }).catch((err: Error) => {
      throw new Error(err.message);
    });
    return execResult;
  }
}
