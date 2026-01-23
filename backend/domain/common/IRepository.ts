import { AggregateRoot } from './AggregateRoot';
import { EntityId } from './EntityId';

export interface IRepository<TEntity extends AggregateRoot<TEntityId>, TEntityId extends EntityId> {
  getAllAsync(): Promise<TEntity[]>;

  getByIdAsync(id: TEntityId): Promise<TEntity>;

  getByIdsAsync(ids: TEntityId[]): Promise<TEntity[]>;

  add(entity: TEntity): Promise<TEntity>;

  update(entity: TEntity): Promise<TEntity>;

  remove(entity: TEntity): Promise<void>;  
}