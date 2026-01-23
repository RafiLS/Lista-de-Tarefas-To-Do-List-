import { EntityId } from "./EntityId";

export abstract class ObjectIdEntityId extends EntityId {
  constructor(value: string) {
    super(value);
  }

  protected createFromString(text: string): string {
    if (!/^[0-9a-fA-F]{24}$/.test(text)) {
      throw new Error(`Invalid ObjectId format: ${text}`);
    }
    return text;
  }

  public asString(): string {
    return this.objValue?.toString() ?? '';
  }
}