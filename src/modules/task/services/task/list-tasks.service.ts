import { IService } from '@/shared/application/service.interface';
import { TaskEntity } from '../../domain/entities/task.entity';
import { IRepository } from '@/shared/contracts/repository.interface';

export class ListTasksService implements IService<null, TaskEntity[]> {
  constructor(private readonly taskRepository: IRepository<TaskEntity>) {
    this.taskRepository = taskRepository;
  }

  execute(input: null): Promise<TaskEntity[]> {
    return this.taskRepository.getAll();
  }
}
