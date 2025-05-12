import { AbstractInMemoryRepository } from '@/shared/infra/repositories/in-memory-repository.abstract';

import { TaskEntity } from '@/modules/task/domain/entities/task.entity';

export class InMemoryTaskRepository extends AbstractInMemoryRepository<TaskEntity, string> {
  protected generateId(): string {
    return self.crypto.randomUUID();
  }

  async getTasks(): Promise<TaskEntity[]> {
    return this.getAll();
  }

  async createTask(task: Omit<TaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TaskEntity> {
    return this.create({
      ...task,
      completed: false,
    });
  }

  async updateTask(taskId: string, task: Partial<TaskEntity>): Promise<string> {
    const updatedTask = await this.update(taskId, { ...task, updatedAt: new Date() });
    return updatedTask?.id ?? '';
  }

  async deleteTask(taskId: string): Promise<void> {
    return this.delete(taskId);
  }
}
