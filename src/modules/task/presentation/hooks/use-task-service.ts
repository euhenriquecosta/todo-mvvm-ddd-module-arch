import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTaskBody, GetTasksResponse } from '@/modules/task/core/repositories/task.repository';
import { TaskService } from '@/modules/task/presentation/services/task.service';
import { HttpClient } from '@/modules/task/core/infra/http/axios/axios-adapter';
import { TaskHttpRepository } from '@/modules/task/core/infra/repositories/task/task.http.repository';

const httpClient = HttpClient.create();
const taskRepo = new TaskHttpRepository(httpClient);
const taskService = new TaskService(taskRepo);

export function useListTasks() {
  return useQuery<GetTasksResponse, Error>({
    queryKey: ['tasks'],
    queryFn: () => taskService.getTasks(),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskBody) => taskService.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error creating task', error);
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting task', error);
    },
  });
}
