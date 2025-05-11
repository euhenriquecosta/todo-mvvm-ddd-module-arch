// modules/tasks/core/repositories/external-task-repo.ts

import { Task } from '@/task/core/domain/entities/task.entity';
import { TaskRepository } from '@/task/core/repositories/task.repository';

export class InMemoryTaskRepository implements TaskRepository {
  // Repositório em memória para armazenar as tarefas
  private tasks: Task[] = [];

  // Método para buscar todas as tarefas
  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  // Método para criar uma nova tarefa
  async createTask(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  // Método para atualizar uma tarefa
  async updateTask(taskId: number, task: Task): Promise<Task> {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
      throw new Error('Task not found');
    }
    this.tasks[index] = task;
    return task;
  }

  // Método para excluir uma tarefa
  async deleteTask(taskId: number): Promise<void> {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
      throw new Error('Task not found');
    }
    this.tasks.splice(index, 1);
  }
}
