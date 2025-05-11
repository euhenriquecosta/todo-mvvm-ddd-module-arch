import { TaskRepository } from '@/task/core/repositories/task/task.repository';
import { Task } from '@/task/core/domain/entities/task.entity';

export class GetTasks {
  private taskRepo: TaskRepository;

  constructor(taskRepo: TaskRepository) {
    this.taskRepo = taskRepo;
  }

  async execute(): Promise<Task[]> {
    return this.taskRepo.getTasks();
  }
}
