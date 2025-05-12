'use client';
// app/page.tsx
import React from 'react';
import { useTaskModel } from './task.model';
import { TaskView } from './task.view';
import { TaskServiceProvider } from '../context/task-service-context';

// Fiz essa separação para que o Provider seja renderizado depois do useTaskModel
const TaskListPage = () => {
  return (
    <TaskServiceProvider useInMemoryRepo={false}>
      <TaskListContent />
    </TaskServiceProvider>
  );
};

const TaskListContent = () => {
  const methods = useTaskModel();
  return <TaskView {...methods} />;
};

export default TaskListPage;
