import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Do not submit empty title

    // Send data to parent (App.js) / backend
    addTask({ title, detail, reminderTime });

    // Reset form fields
    setTitle("");
    setDetail("");
    setReminderTime("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <br />
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder="Task Details / Commands"
      />
      <br />
      <input
        type="datetime-local"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
      />
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
