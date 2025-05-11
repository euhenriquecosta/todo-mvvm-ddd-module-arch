import {
  CreateTaskBody,
  CreateTaskResponse,
  GetTasksResponse,
  TaskParam,
  TaskRepository,
  UpdateTaskBody,
  UpdateTaskResponse,
} from '@/task/core/repositories/task.repository';

import { ITaskService } from '@/task/presentation/interfaces/task-service.interface';

// Definir as funções que vão interagir com a API usando React Query
export class TaskService implements ITaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasks(): Promise<GetTasksResponse> {
    return this.taskRepository.getTasks().then((tasks: GetTasksResponse) => {
      return tasks;
    });
  }

  async createTask(task: CreateTaskBody): Promise<CreateTaskResponse> {
    return this.taskRepository.createTask(task).then(task => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      } as CreateTaskResponse;
    });
  }

  async updateTask(taskId: TaskParam, task: UpdateTaskBody): Promise<UpdateTaskResponse> {
    return this.taskRepository.updateTask(taskId, task).then((task: UpdateTaskResponse) => {
      return task;
    });
  }

  // Método para excluir uma tarefa
  async deleteTask(taskId: TaskParam): Promise<void> {
    return this.taskRepository.deleteTask(taskId);
  }
}
