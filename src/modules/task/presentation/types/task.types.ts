export interface ICreateTaskService {
  exec(data: CreateTaskBody): Promise<Task>;
}

export interface IDeleteTaskService {
  exec(params: DeleteTaskParams): Promise<void>;
}

export interface IListTaskService {
  exec(): Promise<Array<Task>>;
}

export interface TaskServices {
  createTaskService: ICreateTaskService;
  deleteTaskService: IDeleteTaskService;
  listTaskService: IListTaskService;
}