const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// GET all users
router.get('/api/users', UserController.getAllUsers);

// GET a single user by its _id and populated thought and friend data
router.get('/api/users/:id', UserController.getUserById);

// POST a new user
router.post('/api/users', UserController.createUser);

// PUT to update a user by its _id
router.put('/api/users/:id', UserController.updateUser);

// DELETE to remove user by its _id
router.delete('/api/users/:id', UserController.deleteUser);

// POST to add a new friend to a user's friend list
router.post('/api/users/:userId/friends/:friendId', UserController.createUser);

// DELETE to remove a friend from a user's friend list
router.delete('/api/users/:userId/friends/:friendId', UserController.deleteUser);

module.exports = router;