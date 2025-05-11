import { useState, useEffect } from 'react';
import { Task as DomainTask } from '@/task/core/domain/entities/task.entity';
import { Task as PresentationTask } from '@/task/presentation/app/task.model';
import { TaskRepository } from '@/task/core/repositories/task.repository'; // Supondo que TaskRepository já exista
import { TaskHttpRepository } from '@/task/core/infra/repositories/task/task.http.repository'; // Repositório que faz chamadas HTTP
import { HttpClient } from '@/task/core/infra/http/axios/axios-adapter';

export interface TaskViewModel {
  tasks: PresentationTask[];
  loading: boolean;
}

export function useTaskViewModel(): TaskViewModel {
  const [tasks, setTasks] = useState<PresentationTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const httpClient = HttpClient.create();
  const taskRepo: TaskRepository = new TaskHttpRepository(httpClient);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskData: DomainTask[] = await taskRepo.getTasks();
        const presentationTasks: PresentationTask[] = taskData.map(
          domainTask => new PresentationTask(domainTask),
        );
        setTasks(presentationTasks);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading };
}
