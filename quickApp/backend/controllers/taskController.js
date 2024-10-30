const { Op } = require('sequelize');
const Task = require('../models/Task');

// Function to handle creating a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      priority
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Function to handle fetching all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

// Function to handle updating a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority } = req.body;
    const [updated] = await Task.update(
      { title, description, dueDate, priority },
      { where: { id } }
    );

    if (updated) {
      const updatedTask = await Task.findOne({ where: { id } });
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Function to handle deleting a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({
      where: { id }
    });

    if (deleted) {
      res.status(204).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};