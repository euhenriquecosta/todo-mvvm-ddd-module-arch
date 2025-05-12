import { IService } from '@/shared/application/service.interface';
import { TaskEntity } from '../../domain/entities/task.entity';
import { IRepository } from '@/shared/contracts/repository.interface';

export class CreateTaskService
  implements IService<Omit<TaskEntity, 'id' | 'createdAt' | 'updatedAt'>, TaskEntity>
{
  constructor(private readonly taskRepository: IRepository<TaskEntity>) {
    this.taskRepository = taskRepository;
  }
  execute(input: Omit<TaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TaskEntity> {
    return this.taskRepository.create(input);
  }
}
