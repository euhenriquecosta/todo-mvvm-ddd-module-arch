import {
  CreateTaskBody,
  CreateTaskResponse,
  GetTasksResponse,
  TaskParam,
  UpdateTaskBody,
  UpdateTaskResponse,
} from '@/task/core/repositories/task.repository';

export interface ITaskService {
  getTasks(): Promise<GetTasksResponse>;
  createTask(task: CreateTaskBody): Promise<CreateTaskResponse>;
  updateTask(taskId: TaskParam, task: UpdateTaskBody): Promise<UpdateTaskResponse>;
  deleteTask(taskId: TaskParam): Promise<void>;
}
