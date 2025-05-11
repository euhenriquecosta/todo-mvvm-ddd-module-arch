// modules/tasks/core/repositories/external-task-repo.ts

import { HttpMethod, IHttpClient } from '@/task/core/domain/contracts/http-client';
import { Task } from '@/task/core/domain/entities/task.entity';

import { TaskRepository } from '@/task/core/repositories/task.repository';

export class TaskHttpRepository implements TaskRepository {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  // Método para buscar todas as tarefas
  async getTasks(): Promise<Task[]> {
    const response = await this.httpClient.sendRequest<Task[], null>({
      method: HttpMethod.GET,
      endpoint: '/tasks',
    });
    return response.map(
      (taskData: any) =>
        new Task(
          taskData.id,
          taskData.title,
          taskData.description,
          new Date(taskData.dueDate),
          taskData.status,
          taskData.priority,
          new Date(taskData.createdAt),
          new Date(taskData.updatedAt),
        ),
    );
  }

  // Método para criar uma nova tarefa
  async createTask(task: Task): Promise<Task> {
    const response = await this.httpClient.sendRequest<Task, Task>({
      method: HttpMethod.POST,
      endpoint: '/tasks',
      body: task,
    });

    return new Task(
      response.id,
      response.title,
      response.description,
      new Date(response.dueDate),
      response.status,
      response.priority,
      new Date(response.createdAt),
      new Date(response.updatedAt),
    );
  }

  // Método para atualizar uma tarefa
  async updateTask(taskId: number, task: Task): Promise<Task> {
    const response = await this.httpClient.sendRequest<Task, Task>({
      method: HttpMethod.PUT,
      endpoint: `/tasks/${taskId}`,
      body: task,
    });

    return new Task(
      response.id,
      response.title,
      response.description,
      new Date(response.dueDate),
      response.status,
      response.priority,
      new Date(response.createdAt),
      new Date(response.updatedAt),
    );
  }

  // Método para excluir uma tarefa
  async deleteTask(taskId: number): Promise<void> {
    await this.httpClient.sendRequest<void, null>({
      method: HttpMethod.DELETE,
      endpoint: `/tasks/${taskId}`,
    });
  }
}
