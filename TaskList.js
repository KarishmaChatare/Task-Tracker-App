import React from 'react';

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            onClick={() => toggleComplete(task)}
          >
            {task.title}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
