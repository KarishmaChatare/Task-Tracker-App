import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title) {
      addTask(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
