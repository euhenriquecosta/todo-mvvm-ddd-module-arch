export class Task {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly dueDate: Date,
    public readonly status: 'pending' | 'completed' | 'in-progress',
    public readonly priority: 'low' | 'medium' | 'high',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  isOverdue(currentDate: Date = new Date()): boolean {
    return this.dueDate < currentDate && this.status !== 'completed';
  }

  isHighPriority(): boolean {
    return this.priority === 'high';
  }

  isPending(): boolean {
    return this.status === 'pending';
  }
}
