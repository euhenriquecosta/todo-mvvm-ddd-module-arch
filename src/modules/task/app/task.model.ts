'use client';
import { useState, useEffect } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { TaskEntity } from '../domain/entities/task.entity';
import { useTaskServices } from '../hooks/use-task-service';

export function useTaskModel() {
  const [error, setError] = useState<Error | null>(null);
  const { createTaskService, deleteTaskService, listTaskService } = useTaskServices();

  const {
    data: fetchedTasks,
    isLoading,
    isError,
    error: fetchError,
  } = useQuery<TaskEntity[], Error>({
    queryKey: ['tasks'],
    queryFn: async () => await listTaskService.execute(null),
  });

  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (data: Omit<TaskEntity, 'id' | 'createdAt' | 'updatedAt'>) =>
      await createTaskService.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error creating task', error);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => await deleteTaskService.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting task', error);
    },
  });

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

  return {
    tasks,
    loading: isLoading,
    error,
    title,
    description,
    handleCreateTask,
    handleDeleteTask,
    setTitle,
    setDescription,
    createTaskMutation,
    deleteTaskMutation,
  };
}
