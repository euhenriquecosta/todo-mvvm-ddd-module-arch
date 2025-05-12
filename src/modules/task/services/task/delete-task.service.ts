import { IService } from '@/shared/application/service.interface';
import { IRepository } from '@/shared/contracts/repository.interface';
import { TaskEntity } from '../../domain/entities/task.entity';

export class DeleteTaskService implements IService<string, void> {
  constructor(private readonly taskRepository: IRepository<TaskEntity, string>) {}

  async execute(input: string): Promise<void> {
    await this.taskRepository.delete(input);
  }
}
