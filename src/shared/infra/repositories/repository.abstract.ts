import { IRepository } from '@/shared/contracts/repository.interface';

// Mantenha a classe abstrata para forçar a implementação nas subclasses
export abstract class AbstractRepository<TEntity extends { id?: TId }, TId = string>
  implements IRepository<TEntity, TId>
{
  abstract getById(id: TId): Promise<TEntity | undefined>;
  abstract getAll(): Promise<TEntity[]>;
  abstract create(entity: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TEntity>;
  abstract update(id: TId, entity: Partial<TEntity>): Promise<TEntity | void>;
  abstract delete(id: TId): Promise<void>;
}
