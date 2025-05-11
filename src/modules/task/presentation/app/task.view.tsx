import { TaskViewModel } from './task.vm';

export function TaskView(props: TaskViewModel) {
  const { tasks, loading } = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
