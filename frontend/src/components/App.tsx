import React from 'react';

type Task = {
  id: number;
  title: string; // correction ici
  completed: boolean;
};

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

function TaskList({ tasks, onDelete, onToggle }: Props) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => onDelete(task.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
