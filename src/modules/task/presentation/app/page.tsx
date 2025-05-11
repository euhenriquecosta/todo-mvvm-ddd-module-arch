'use client';
// app/page.tsx
import React from 'react';
import { useTaskViewModel } from './task.vm';
import { TaskView } from './task.view';

const TaskListPage = () => {
  const methods = useTaskViewModel();

  return <TaskView {...methods} />;
};

export default TaskListPage;
