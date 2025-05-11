// useListTaskModel.tsx
import { useTodoListContainer } from './TodoListContext'; // Usando o contexto para acessar os serviços
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Task } from './Task';

export const useListTaskModel = () => {
  const { createTaskService, deleteTaskService, listTaskService } = useTodoListContainer();
  const [textTask, setTextTask] = useState<string>('');
  const queryClient = useQueryClient();

  // Método para invalidar o cache e forçar uma nova busca
  const invalidCacheListTask = () => {
    queryClient.invalidateQueries({ queryKey: ['list-task'] });
  };

  // Query para buscar as tarefas
  const { data: listTask } = useQuery<Array<Task>>({
    queryKey: ['list-task'],
    queryFn: () => listTaskService.exec(),
  });

  // Mutation para adicionar uma tarefa
  const { mutate: createTask } = useMutation({
    mutationFn: (data: { name: string }) => createTaskService.exec(data),
    onSuccess: () => invalidCacheListTask(),
  });

  // Mutation para deletar uma tarefa
  const { mutate: deleteTask } = useMutation({
    mutationFn: (params: { id: number }) => deleteTaskService.exec(params),
    onSuccess: () => invalidCacheListTask(),
  });

  // Manipulador para adicionar tarefa
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTask({ name: textTask });
    setTextTask('');
  };

  const hasTasks = (listTask ?? []).length > 0;

  return {
    textTask,
    setTextTask,
    listTask,
    handleAddTask,
    deleteTask,
    hasTasks,
  };
};
