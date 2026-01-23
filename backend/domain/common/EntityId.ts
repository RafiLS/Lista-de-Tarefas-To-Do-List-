export abstract class EntityId {
  protected readonly objValue: any;

  public get value(): string {
    if (typeof this.objValue === 'string') {
      return this.objValue;
    }
    return this.asString();
  }

  protected constructor(value: any) {
    if (typeof value === 'string') {
      this.objValue = this.createFromString(value);
    } else {
      this.objValue = value;
    }
  }

  protected abstract createFromString(text: string): any;

  public abstract asString(): string;

  public equals(other?: EntityId): boolean {
    if (!other) return false;
    if (this === other) return true;
    return this.value === other.value;
  }

  public compareTo(other?: EntityId): number {
    if (!other) return -1;
    return this.value.localeCompare(other.value);
  }

  public toString(): string {
    return this.value;
  }
}
