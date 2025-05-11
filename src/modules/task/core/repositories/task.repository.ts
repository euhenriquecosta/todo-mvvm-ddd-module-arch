export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTaskBody = {
  title: string;
  description: string;
  completed: boolean;
};

export type UpdateTaskBody = {
  title?: string;
  description?: string;
  completed?: boolean;
};

export type CreateTaskResponse = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GetTasksResponse = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}[];

export type UpdateTaskResponse = TaskParam;

export type TaskParam = string;
export abstract class TaskRepository {
  abstract getTasks(): Promise<GetTasksResponse>;
  abstract createTask(task: CreateTaskBody): Promise<CreateTaskResponse>;
  abstract updateTask(taskId: TaskParam, task: UpdateTaskBody): Promise<UpdateTaskResponse>;
  abstract deleteTask(params: TaskParam): Promise<void>;
}
