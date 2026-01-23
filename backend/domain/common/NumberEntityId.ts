import { EntityId } from "./EntityId";


export abstract class NumberEntityId extends EntityId {

  public get numericValue(): number {
    return Number(this.value);
  }

  constructor(value: number | string) {
    NumberEntityId.validateValue(value);
    super(value);
  }


  private static validateValue(value: number | string): void {
    if (value === null || value === undefined) {
      throw new Error('ID value cannot be null or undefined');
    }

    const num = typeof value === 'string' ? Number(value) : value;

    if (isNaN(num)) {
      throw new Error(`Invalid number format: ${value}`);
    }

    if (!isFinite(num)) {
      throw new Error(`ID value cannot be Infinity: ${value}`);
    }

    if (num < 0) {
      throw new Error(`ID value cannot be negative: ${value}`);
    }

    if (!Number.isInteger(num)) {
      throw new Error(`ID value must be an integer: ${value}`);
    }
  }

  protected createFromString(text: string): number {
    const num = Number(text);
    if (isNaN(num)) {
      throw new Error(`Invalid number format: ${text}`);
    }
    return num;
  }

  public asString(): string {
    return this.objValue?.toString() ?? '';
  }

  public compareTo(other?: NumberEntityId): number {
    if (!other) return -1;
    return this.numericValue - other.numericValue;
  }
}