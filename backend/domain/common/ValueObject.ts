export abstract class ValueObject {
  protected abstract getAtomicValues(): Iterable<any>;

  private valuesAreEqual(valueObject: ValueObject): boolean {
    const thisValues = Array.from(this.getAtomicValues());
    const otherValues = Array.from(valueObject.getAtomicValues());

    if (thisValues.length !== otherValues.length) {
      return false;
    }

    return thisValues.every((value, index) => {
      const otherValue = otherValues[index];
      
      if (value === otherValue) return true;
      if (value == null || otherValue == null) return false;
      if (typeof value !== typeof otherValue) return false;
      
      if (typeof value === 'object') {
        return JSON.stringify(value) === JSON.stringify(otherValue);
      }
      
      return value === otherValue;
    });
  }

  public equals(other?: ValueObject): boolean {
    if (!other) return false;
    if (this === other) return true;
    if (this.constructor !== other.constructor) return false;
    return this.valuesAreEqual(other);
  }

  public hashCode(): number {
    const values = Array.from(this.getAtomicValues());
    return values.reduce((hash, value) => {
      const valueHash = this.getHashCodeForValue(value);
      return ((hash << 5) - hash) + valueHash;
    }, 0);
  }

  private getHashCodeForValue(value: any): number {
    if (value == null) return 0;
    
    if (typeof value === 'string') {
      return this.stringHashCode(value);
    }
    
    if (typeof value === 'number') {
      return value;
    }
    
    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }
    
    if (typeof value === 'object') {
      return this.stringHashCode(JSON.stringify(value));
    }
    
    return 0;
  }

  private stringHashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }
}