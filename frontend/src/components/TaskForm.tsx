import React, { useState } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche"
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <button
        type="submit"
        style={{ marginLeft: '1rem', backgroundColor: 'pink', padding: '0.5rem 1rem', border: 'none', fontSize: '1rem' }}
      >
        Ajouter
      </button>
    </form>
  );
}

export default TaskForm;
