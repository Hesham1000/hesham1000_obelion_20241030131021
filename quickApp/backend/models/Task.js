const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Ensure you have a config file to handle the connection

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Tasks', // Match the table name in the database
  timestamps: false, // Disable timestamps
});

module.exports = Task;