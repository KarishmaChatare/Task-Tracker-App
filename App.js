import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = (title) => {
    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    .then(res => res.json())
    .then(newTask => setTasks([...tasks, newTask]));
  };

  const toggleComplete = (task) => {
    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, completed: !task.completed })
    })
    .then(res => res.json())
    .then(updated => setTasks(tasks.map(t => t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
