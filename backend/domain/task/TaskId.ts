import { EntityId } from '../common/EntityId';

export class TaskId extends EntityId {
  constructor(value?: string) {
    super(value ?? TaskId.generate());
  }

  protected createFromString(text: string): string {
    return text;
  }

  public asString(): string {
    return this.objValue;
  }

  private static generate(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
