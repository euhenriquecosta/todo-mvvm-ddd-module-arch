import { useTaskModel } from './task.model';

type TaskViewProps = ReturnType<typeof useTaskModel>;

export function TaskView(props: TaskViewProps) {
  const {
    tasks,
    loading,
    title,
    description,
    handleCreateTask,
    handleDeleteTask,
    setTitle,
    setDescription,
    createTaskMutation,
    deleteTaskMutation,
  } = props;

  if (loading) {
    return <div data-testid="loading-spinner">Loading...</div>;
  }

  return (
    <div data-testid="task-view-container">
      <div>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          data-testid="task-title-input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          data-testid="task-description-input"
        />
        <button onClick={handleCreateTask} data-testid="create-task-button">
          Add Task
        </button>
        {createTaskMutation.isPending && <p>Creating task...</p>}
        {createTaskMutation.isError && (
          <p>Error creating task: {createTaskMutation.error?.message}</p>
        )}
      </div>

      {tasks.map(task => (
        <div key={task.id} data-testid={`task-item-${task.id}`}>
          <h3 data-testid={`task-title-${task.id}`}>{task.title}</h3>
          <p data-testid={`task-description-${task.id}`}>{task.description}</p>
          <button
            onClick={() => handleDeleteTask(task.id)}
            data-testid={`delete-task-button-${task.id}`}
          >
            Delete Task
          </button>
          {deleteTaskMutation.isPending && deleteTaskMutation.variables === task.id && (
            <p>Deleting task...</p>
          )}
          {deleteTaskMutation.isError &&
            deleteTaskMutation.variables === task.id &&
            deleteTaskMutation.error && (
              <p>Error deleting task: {deleteTaskMutation.error.message}</p>
            )}
        </div>
      ))}
    </div>
  );
}
