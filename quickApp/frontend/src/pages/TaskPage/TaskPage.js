import React, { useState } from 'react';
import axios from 'axios';
import './TaskPage.css';

function TaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      dueDate,
      priority,
    };

    try {
      const response = await axios.post('https://quickApp-backend.cloud-stacks.com/api/v1/tasks', newTask, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage(response.data.message);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error creating task');
    }
  };

  return (
    <div className="task-page">
      <h1>Create New Task</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="task-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        <label>
          Priority:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
}

export default TaskPage;
