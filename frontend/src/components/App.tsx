import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Récupérer les tâches depuis le backend
  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Erreur lors du fetch :", err));
  }, []);

  const handleAddTask = async (text: string) => {
    const newTask = { text, completed: false };

    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });

    const savedTask = await response.json();
    setTasks([...tasks, savedTask]);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggle = async (id: number) => {
    const updatedTask = tasks.find((t) => t.id === id);
    if (!updatedTask) return;

    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updatedTask, completed: !updatedTask.completed }),
    });

    const savedTask = await response.json();
    setTasks(tasks.map((t) => (t.id === id ? savedTask : t)));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1> Todo App</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}

export default App;
