import { Task } from '@/task/core/domain/entities/task.entity';
import { TaskRepository } from '@/task/core/repositories/task/task.repository';

export class UpdateTask {
  private taskRepo: TaskRepository;

  constructor(taskRepo: TaskRepository) {
    this.taskRepo = taskRepo;
  }

  async execute(taskId: number, task: Task): Promise<Task> {
    return this.taskRepo.updateTask(taskId, task);
  }
}
