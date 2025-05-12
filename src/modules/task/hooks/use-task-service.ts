import { useContext } from 'react';
import { TaskServiceContext, TaskServiceContextProps } from '../context/task-service-context';

export const useTaskServices = (): TaskServiceContextProps => {
  const services = useContext(TaskServiceContext);
  if (!services) {
    throw new Error('useTaskServices must be used within a TaskServiceProvider');
  }
  return services;
};
