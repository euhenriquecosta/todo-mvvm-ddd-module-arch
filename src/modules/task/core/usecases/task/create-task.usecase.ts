import { TaskRepository } from '@/task/core/repositories/task.repository';
import { Task } from '@/task/core/domain/entities/task.entity';

export class CreateTask {
  private taskRepo: TaskRepository;

  constructor(taskRepo: TaskRepository) {
    this.taskRepo = taskRepo;
  }

  async execute(task: Task): Promise<Task> {
    return this.taskRepo.createTask(task);
  }
}
