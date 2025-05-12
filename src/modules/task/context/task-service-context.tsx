import React, { createContext } from 'react';

import { CreateTaskService } from '@/modules/task/services/task/create-task.service';
import { ListTasksService } from '@/modules/task/services/task/list-tasks.service';
import { DeleteTaskService } from '@/modules/task/services/task/delete-task.service';

import { TaskHttpRepository } from '@/modules/task/infra/repositories/task/task.http.repository';
import { HttpAxiosClient } from '@/modules/task/http/axios/axios-adapter';

import { InMemoryTaskRepository } from '@/modules/task/infra/repositories/task/task.in-memory.repository';

export interface TaskServiceContextProps {
  createTaskService: CreateTaskService;
  listTaskService: ListTasksService;
  deleteTaskService: DeleteTaskService;
}

// Criando um valor inicial válido
const createInitialContext = (useInMemoryRepo: boolean = true): TaskServiceContextProps => {
  const repoToUse = useInMemoryRepo
    ? new InMemoryTaskRepository()
    : new TaskHttpRepository(HttpAxiosClient.create());

  return {
    createTaskService: new CreateTaskService(repoToUse),
    listTaskService: new ListTasksService(repoToUse),
    deleteTaskService: new DeleteTaskService(repoToUse),
  };
};

export const TaskServiceContext = createContext<TaskServiceContextProps>(createInitialContext());

export const TaskServiceProvider: React.FC<{
  children: React.ReactNode;
  useInMemoryRepo: boolean;
}> = ({ children, useInMemoryRepo = true }) => {
  const value = createInitialContext(useInMemoryRepo);

  return <TaskServiceContext.Provider value={value}>{children}</TaskServiceContext.Provider>;
};
