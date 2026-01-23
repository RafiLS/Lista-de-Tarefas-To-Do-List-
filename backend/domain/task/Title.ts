import { ValueObject } from '../common/ValueObject';


export class Title extends ValueObject {
    private readonly _value: string;

    public get value(): string {
        return this._value;
    }

    private constructor(value: string) {
        super();

        if (!value || value.trim() === "") {
            throw new Error("The task title cannot be empty.");
        }

        this._value = value.trim();
    }

    public static from(value: string): Title {
        return new Title(value);
    }

    protected *getAtomicValues(): Iterable<any> {
        yield this._value;
    }

    public toString(): string {
        return this._value;
    }
}
