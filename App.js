import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend when component loads
  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Add new task
  const addTask = ({ title, detail, reminderTime }) => {
    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, detail, reminderTime })
    })
    .then(res => res.json())
    .then(newTask => setTasks([...tasks, newTask]));
  };

  // Toggle task completed
  const toggleComplete = (task) => {
    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, completed: !task.completed })
    })
    .then(res => res.json())
    .then(updated => setTasks(tasks.map(t => t.id === updated.id ? updated : t)));
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  // Optional: Browser reminder alerts for tasks
  useEffect(() => {
    tasks.forEach(task => {
      if (task.reminderTime && !task.reminderAlerted) {
        const timeLeft = new Date(task.reminderTime) - new Date();
        if (timeLeft > 0) {
          setTimeout(() => alert(`Reminder: ${task.title}`), timeLeft);
          task.reminderAlerted = true; // prevent multiple alerts
        }
      }
    });
  }, [tasks]);

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
