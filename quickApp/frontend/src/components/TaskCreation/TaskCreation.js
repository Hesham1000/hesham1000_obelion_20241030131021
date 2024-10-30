import React, { useState } from 'react';
import axios from 'axios';
import './TaskCreation.css';

function TaskCreation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = async () => {
    try {
      const newTask = {
        title,
        description,
        dueDate,
        priority,
      };

      const response = await axios.post('https://quickApp-backend.cloud-stacks.com/api/v1/tasks', newTask, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Task created successfully');
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred while creating the task');
    }
  };

  return (
    <div className="task-creation-container">
      <h1>Create New Task</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="task-form">
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
          />
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
        <button type="button" onClick={handleSave}>
          Save Task
        </button>
      </form>
    </div>
  );
}

export default TaskCreation;
