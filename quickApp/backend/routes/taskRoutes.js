const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

// Updated with 'db' instead of 'localhost'
const sequelize = new Sequelize('quickApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

// Define the Task model matching the database schema
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false
  }
}, {
  tableName: 'Tasks',
  timestamps: false
});

router.post('/tasks', async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    await Task.create({ title, description, dueDate, priority });

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the task' });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving tasks' });
  }
});

router.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority } = req.body;

    if (!title || !description || !dueDate || !priority) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.update({ title, description, dueDate, priority });

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the task' });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the task' });
  }
});

module.exports = router;