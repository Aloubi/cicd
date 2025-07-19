import React from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

function TaskList({ tasks, onDelete, onToggle }: Props) {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ margin: '1rem 0' }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span
            style={{
              margin: '0 1rem',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'red' : 'black',
            }}
          >
            {task.title}
          </span>
          <button onClick={() => onDelete(task.id)} style={{ marginRight: '0.5rem', backgroundColor: 'pink' }}>
            Supprimer
          </button>
          <button style={{ backgroundColor: '#ccc' }}>
            Modifier
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
