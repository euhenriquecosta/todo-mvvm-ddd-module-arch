import { Task } from '@/task/core/domain/entities/task.entity';

export abstract class TaskRepository {
  abstract getTasks(): Promise<Task[]>;
  abstract createTask(task: Task): Promise<Task>;
  abstract updateTask(taskId: number, task: Task): Promise<Task>;
  abstract deleteTask(taskId: number): Promise<void>;
}
