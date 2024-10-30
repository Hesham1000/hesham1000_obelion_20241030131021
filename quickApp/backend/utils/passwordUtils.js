const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

// Model name adjusted to match 'Users' table from database schema
module.exports = {
  hashPassword,
  comparePassword,
  modelName: 'Users', // Ensure this matches the table created in the database
};

// Example of how you might configure your database connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'db', // Replace 'localhost' with 'db'
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;