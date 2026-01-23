import { EntityId } from './EntityId';

export abstract class Entity<TEntityId extends EntityId> {
  private _id!: TEntityId;

  
  public get id(): TEntityId {
    return this._id;
  }

  protected set id(value: TEntityId) {
    this._id = value;
  }

  public equals(other?: Entity<TEntityId>): boolean {
    if (!other) return false;
    if (this === other) return true;
    if (!this.id || !other.id) return false;
    return this.id.equals(other.id);
  }
}
