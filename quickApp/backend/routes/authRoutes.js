const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Update Sequelize model to match the database schema
const { Users } = require('../models');

// Account creation endpoint
router.post('/signup', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match.' });
        }
        const result = await authController.createAccount(email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { loginEmail, loginPassword } = req.body;
        const result = await authController.login(loginEmail, loginPassword);
        if (!result) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Password reset request
router.post('/reset-password', async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authController.resetPassword(email);
        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

// Sequelize model file (models/users.js)
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: false,
});

module.exports = Users;

// Database configuration file (config/database.js)
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'db',
    dialect: 'mysql',
});

module.exports = sequelize;