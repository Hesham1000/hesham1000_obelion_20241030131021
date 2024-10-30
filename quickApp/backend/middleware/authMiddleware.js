const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

// Define the sequelize instance
const sequelize = new Sequelize('quickApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: false
});

// Define the authentication middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).send({ error: 'Please authenticate.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;