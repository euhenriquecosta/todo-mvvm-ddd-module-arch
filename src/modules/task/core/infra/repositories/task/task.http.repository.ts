// modules/tasks/core/repositories/external-task-repo.ts

import { HttpMethod, IHttpClient } from '@/task/core/domain/contracts/http-client';

import {
  CreateTaskBody,
  CreateTaskResponse,
  GetTasksResponse,
  TaskParam,
  TaskRepository,
  UpdateTaskBody,
  UpdateTaskResponse,
} from '@/task/core/repositories/task.repository';
export class TaskHttpRepository implements TaskRepository {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  // Método para buscar todas as tarefas
  async getTasks(): Promise<GetTasksResponse> {
    const response = (await this.httpClient.sendRequest({
      method: HttpMethod.GET,
      endpoint: '/tasks',
    })) as GetTasksResponse;
    return response;
  }

  // Método para criar uma nova tarefa
  async createTask(task: CreateTaskBody): Promise<CreateTaskResponse> {
    const response = await this.httpClient.sendRequest<CreateTaskResponse, CreateTaskBody>({
      method: HttpMethod.POST,
      endpoint: '/tasks',
      body: task,
    });

    return response;
  }

  // Método para atualizar uma tarefa
  async updateTask(taskId: TaskParam, task: UpdateTaskBody): Promise<UpdateTaskResponse> {
    const response = await this.httpClient.sendRequest<UpdateTaskResponse, UpdateTaskBody>({
      method: HttpMethod.PUT,
      endpoint: `/tasks/${taskId}`,
      body: task,
    });

    return response;
  }

  // Método para excluir uma tarefa
  async deleteTask(taskId: TaskParam): Promise<void> {
    await this.httpClient.sendRequest<void, null>({
      method: HttpMethod.DELETE,
      endpoint: `/tasks/${taskId}`,
    });
  }
}
