'use client';
import { useState, useEffect } from 'react';
import { Task as PresentationTask } from '@/modules/task/presentation/app/task.model';

import { useCreateTask, useDeleteTask, useListTasks } from '../hooks/use-task-service';
import { CreateTaskBody, CreateTaskResponse } from '../../core/repositories/task.repository';
import { UseMutationResult } from '@tanstack/react-query';

export interface TaskViewModel {
  tasks: PresentationTask[];
  loading: boolean;
  error: Error | null;
  title: string;
  description: string;
  handleCreateTask: () => void;
  handleDeleteTask: (id: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  createTaskMutation: UseMutationResult<CreateTaskResponse, Error, CreateTaskBody>;
  deleteTaskMutation: UseMutationResult<void, Error, string>;
}
export function useTaskViewModel(): TaskViewModel {
  const [error, setError] = useState<Error | null>(null);

  const { data: fetchedTasks, isLoading, isError, error: fetchError } = useListTasks();
  const createTaskMutation = useCreateTask();
  const deleteTaskMutation = useDeleteTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTask = () => {
    if (title && description) {
      createTaskMutation.mutate({ title, description, completed: false });
      setTitle('');
      setDescription('');
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  const tasks = fetchedTasks || [];

  useEffect(() => {
    if (isError && fetchError) {
      setError(fetchError);
    } else {
      setError(null);
    }
  }, [isError, fetchError]);

  return { tasks, loading: isLoading, error, title, description, handleCreateTask, handleDeleteTask, setTitle, setDescription, createTaskMutation, deleteTaskMutation };
}
