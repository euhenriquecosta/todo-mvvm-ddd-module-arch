// modules/task/presentation/app/task.model.ts

import { Task as DomainTask } from '@/task/core/domain/entities/task.entity';

export class Task {
  id: number;
  title: string;
  description: string;
  dueDate: string; // A data será formatada como string
  status: 'pending' | 'completed' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;

  constructor(domainTask: DomainTask) {
    this.id = domainTask.id;
    this.title = domainTask.title;
    this.description = domainTask.description;
    this.dueDate = domainTask.dueDate.toLocaleDateString('pt-BR'); // Formatação da data
    this.status = domainTask.status;
    this.priority = domainTask.priority;
    this.createdAt = domainTask.createdAt.toLocaleDateString('pt-BR');
    this.updatedAt = domainTask.updatedAt.toLocaleDateString('pt-BR');
  }

  // Método de formatação de data (se necessário, pode manter no modelo)
  getFormattedDueDate(): string {
    return this.dueDate; // Já formatada
  }
}
