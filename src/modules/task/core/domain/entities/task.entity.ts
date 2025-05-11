export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}
