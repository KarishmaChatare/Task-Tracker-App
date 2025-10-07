import React from 'react';

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          <strong>{task.title}</strong>
          <p>{task.detail}</p>
          <small>
            Reminder: {task.reminderTime ? new Date(task.reminderTime).toLocaleString() : "None"}
          </small>
          <div>Completed: {task.completed ? "Yes" : "No"}</div>
          <button onClick={() => toggleComplete(task)}>
            Mark as {task.completed ? "Undone" : "Done"}
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete Task</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
