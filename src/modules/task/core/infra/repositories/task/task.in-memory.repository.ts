import {
  CreateTaskBody,
  CreateTaskResponse,
  GetTasksResponse,
  TaskParam,
  TaskRepository,
  UpdateTaskBody,
  UpdateTaskResponse,
} from '@/task/core/repositories/task.repository';

import { Task as DomainTask } from '@/task/core/domain/entities/task.entity';

export class InMemoryTaskRepository implements TaskRepository {
  // Repositório em memória para armazenar as tarefas
  private tasks: DomainTask[] = [];

  // Método para buscar todas as tarefas
  async getTasks(): Promise<GetTasksResponse> {
    return this.tasks;
  }

  // Método para criar uma nova tarefa
  async createTask(task: CreateTaskBody): Promise<CreateTaskResponse> {
    const newTask: DomainTask = {
      id: self.crypto.randomUUID(),
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(newTask);
    return {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      completed: newTask.completed,
      createdAt: newTask.createdAt,
      updatedAt: newTask.updatedAt,
    };
  }

  // Método para atualizar uma tarefa
  async updateTask(taskId: TaskParam, task: UpdateTaskBody): Promise<UpdateTaskResponse> {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
      throw new Error('Task not found');
    }
    const updatedTask = {
      id: taskId,
      title: task?.title,
      description: task?.description,
      completed: task?.completed,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Retornar a task atualizada com todos os campos por id
    return updatedTask.id;
  }

  // Método para excluir uma tarefa
  async deleteTask(taskId: TaskParam): Promise<void> {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
      throw new Error('Task not found');
    }
    this.tasks.splice(index, 1);
  }
}
