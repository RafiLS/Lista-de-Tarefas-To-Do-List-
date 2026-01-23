import { Entity } from './Entity';
import { EntityId } from './EntityId';


export abstract class AggregateRoot<TEntityId extends EntityId> extends Entity<TEntityId> {
}