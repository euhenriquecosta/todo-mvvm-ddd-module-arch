import React, { createContext, useContext } from 'react';

interface TaskServices {
  createTaskService: ICreateTaskService;
  deleteTaskService: IDeleteTaskService;
  listTaskService: IListTaskService;
}

export const TaskContext = createContext<TaskServices>({} as TaskServices);

type TaskProviderProps = {
  children: React.ReactNode;
  services: TaskServices;
};

export function TaskProvider({ children, services }: TaskProviderProps) {
  return <TaskContext.Provider value={{ ...services }}>{children}</TaskContext.Provider>;
}
