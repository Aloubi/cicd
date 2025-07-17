import React, { useState } from 'react';

interface Props {
  onAdd: (title: string) => void; // correction ici
}

function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState(''); // renommé

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default TaskForm;
