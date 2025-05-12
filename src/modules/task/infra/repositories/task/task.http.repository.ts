// modules/tasks/core/repositories/external-task-repo.ts

import { HttpMethod, IHttpClient } from '@/modules/task/contracts/http-client';
import { TaskEntity } from '@/modules/task/domain/entities/task.entity';
import { AbstractRepository } from '@/shared/infra/repositories/repository.abstract';

export class TaskHttpRepository extends AbstractRepository<TaskEntity, string> {
  protected httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    super();
    this.httpClient = httpClient;
  }

  // Método para buscar todas as tarefas
  async getAll(): Promise<TaskEntity[]> {
    const response = (await this.httpClient.sendRequest({
      method: HttpMethod.GET,
      endpoint: '/tasks',
    })) as TaskEntity[];
    return response;
  }

  // Método para criar uma nova tarefa
  async create(task: Omit<TaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TaskEntity> {
    const response = await this.httpClient.sendRequest<
      TaskEntity,
      Omit<TaskEntity, 'id' | 'createdAt' | 'updatedAt'>
    >({
      method: HttpMethod.POST,
      endpoint: '/tasks',
      body: task,
    });

    return response;
  }

  // Método para atualizar uma tarefa
  async update(taskId: string, task: Partial<TaskEntity>): Promise<TaskEntity | undefined> {
    const response = await this.httpClient.sendRequest<TaskEntity | undefined, Partial<TaskEntity>>(
      {
        method: HttpMethod.PUT,
        endpoint: `/tasks/${taskId}`,
        body: task,
      },
    );

    return response;
  }

  // Método para excluir uma tarefa
  async delete(taskId: string): Promise<void> {
    await this.httpClient.sendRequest<void, null>({
      method: HttpMethod.DELETE,
      endpoint: `/tasks/${taskId}`,
    });
  }

  async getById(taskId: string): Promise<TaskEntity | undefined> {
    const response = await this.httpClient.sendRequest<TaskEntity | undefined, null>({
      method: HttpMethod.GET,
      endpoint: `/tasks/${taskId}`,
    });
    return response;
  }
}
