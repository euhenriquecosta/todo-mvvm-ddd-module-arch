import { TaskRepository } from '@/task/core/repositories/task.repository';
export class DeleteTask {
  private taskRepo: TaskRepository;

  constructor(taskRepo: TaskRepository) {
    this.taskRepo = taskRepo;
  }

  async execute(taskId: number): Promise<void> {
    return this.taskRepo.deleteTask(taskId);
  }
}
