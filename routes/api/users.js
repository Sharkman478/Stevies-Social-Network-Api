const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/api/users', UserController.getAllUsers);

router.get('/api/users/:id', UserController.getUserById);

router.post('/api/users', UserController.createUser);

router.put('/api/users/:id', UserController.updateUser);

router.delete('/api/users/:id', UserController.deleteUser);

router.post('/api/users/:userId/friends/:friendId', UserController.createUser);

router.delete('/api/users/:userId/friends/:friendId', UserController.deleteUser);

module.exports = router;