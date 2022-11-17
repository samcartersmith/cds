import { Task as MonoTask } from '@cbhq/mono-tasks';

export type TestOptions = {
  affected?: boolean;
  cache?: boolean;
  debug?: boolean;
  file?: string[];
  serial?: boolean;
  includeZeroCoverageAudit?: boolean;
  getComponentsMissingA11yCoverage?: boolean;
};

export type Task = MonoTask<TestOptions>;

export class TestTask {
  private task: Task;

  constructor(task: Task) {
    this.task = task;
  }

  public get getTask(): Task {
    return this.task;
  }

  public set setTask(task: Task) {
    this.task = task;
  }
}
