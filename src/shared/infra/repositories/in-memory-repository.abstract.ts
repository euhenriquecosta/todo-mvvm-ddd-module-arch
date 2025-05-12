import { IRepository } from '@/shared/contracts/repository.interface';
import { AbstractRepository } from './repository.abstract';

export abstract class AbstractInMemoryRepository<TEntity extends { id: TId }, TId = string>
  extends AbstractRepository<TEntity, TId>
  implements IRepository<TEntity, TId>
{
  protected items: TEntity[] = [];

  async getById(id: TId): Promise<TEntity | undefined> {
    return this.items.find(item => item.id === id);
  }

  async getAll(): Promise<TEntity[]> {
    return [...this.items];
  }

  async create(entity: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TEntity> {
    const newItem = { ...entity, id: this.generateId() } as TEntity; // Assumindo generateId
    this.items.push(newItem);
    return newItem;
  }

  async update(id: TId, entity: Partial<TEntity>): Promise<TEntity | undefined> {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...entity } as TEntity;
      return this.items[index];
    }
    return undefined;
  }

  async delete(id: TId): Promise<void> {
    this.items = this.items.filter(item => item.id !== id);
  }

  protected abstract generateId(): TId; // Força a subclasse a implementar a geração de ID
}
