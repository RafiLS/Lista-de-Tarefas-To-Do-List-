import { EntityId } from './EntityId';

export abstract class StringEntityId extends EntityId {

  protected constructor(value: string) {
    super(value);
  }

  protected createFromString(text: string): any {
    return text;
  }

  public asString(): string {
    return this.objValue;
  }
}
