import React from 'react';

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
       <li key={task.id}>
  <strong>{task.title}</strong>
  <p>{task.detail}</p>
  <small>Reminder: {task.reminderTime}</small>
  <div>Completed: {task.completed ? "Yes" : "No"}</div>
  <button onClick={() => toggleComplete(task)}>Toggle Done</button>
  <button onClick={() => deleteTask(task.id)}>Delete</button>
</li>

      ))}
    </ul>
  );
}

export default TaskList;
