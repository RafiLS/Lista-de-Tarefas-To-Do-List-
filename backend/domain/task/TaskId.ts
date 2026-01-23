import { NumberEntityId } from "../common/NumberEntityId";

export class TaskId extends NumberEntityId {

  constructor(value: number | string) {
    super(value);
  }

  public static create(): TaskId {
    return new TaskId(0);
  }
}
