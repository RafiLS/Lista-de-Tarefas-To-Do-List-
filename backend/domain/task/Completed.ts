import { ValueObject } from '../common/ValueObject';

export class Completed extends ValueObject {
    private readonly _value: boolean;

    public get value(): boolean {
        return this._value;
    }

    private constructor(value: boolean) {
        super();
        this._value = value;
    }

    public static from(value: boolean): Completed {
        return new Completed(value);
    }

    protected *getAtomicValues(): Iterable<any> {
        yield this._value;
    }

    public toString(): string {
        return this._value.toString();
    }
}
