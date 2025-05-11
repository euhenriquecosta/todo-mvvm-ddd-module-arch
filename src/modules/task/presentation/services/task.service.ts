// services/TaskService.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskRepository } from './repositories/TaskRepository';
import { Task, CreateTaskBody, DeleteTaskParams } from './models';

// Definir as funções que vão interagir com a API usando React Query
export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  // Listar tarefas
  listTasks() {
    return useQuery<Task[]>({
      queryKey: ['tasks'],
      queryFn: () => this.taskRepository.listTasks(),
      onError: error => {
        console.error('Error fetching tasks', error);
      },
    });
  }

  // Criar tarefa
  createTask() {
    return useMutation({
      mutationFn: (data: CreateTaskBody) => this.taskRepository.createTask(data),
      onError: error => {
        console.error('Error creating task', error);
      },
      onSuccess: () => {
        // Invalida o cache de tarefas para que o React Query refaça a consulta após a criação
        const queryClient = useQueryClient();
        queryClient.invalidateQueries(['tasks']);
      },
    });
  }

  // Deletar tarefa
  deleteTask() {
    return useMutation({
      mutationFn: (params: DeleteTaskParams) => this.taskRepository.deleteTask(params),
      onError: error => {
        console.error('Error deleting task', error);
      },
      onSuccess: () => {
        // Invalida o cache de tarefas para que o React Query refaça a consulta após a exclusão
        const queryClient = useQueryClient();
        queryClient.invalidateQueries(['tasks']);
      },
    });
  }
}
