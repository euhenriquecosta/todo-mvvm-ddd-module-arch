export interface IRepository<TEntity, TId = string> {
  getById(id: TId): Promise<TEntity | undefined>;
  getAll(): Promise<TEntity[]>;
  create(entity: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TEntity>;
  update(id: TId, entity: Partial<Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<TEntity | void>;
  delete(id: TId): Promise<void>;
}
