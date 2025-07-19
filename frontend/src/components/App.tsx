import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Erreur lors de la récupération :", err));
  }, []);

  const handleAddTask = async (title: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      const savedTask = await response.json();
      setTasks([...tasks, savedTask]);
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const handleToggle = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });

      const updatedTask = await response.json();
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Erreur lors du toggle :", err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1 style={{ color: 'hotpink', fontSize: '3rem' }}>Todo Liste</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}

export default App;
