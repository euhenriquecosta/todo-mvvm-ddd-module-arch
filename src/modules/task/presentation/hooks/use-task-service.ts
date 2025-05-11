import { useContext } from 'react';
import { TaskContext, TaskServices } from '../context/task-context';

export const useTaskService = (): TaskServices => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskService must be used within a TaskProvider');
  }
  return context;
};
