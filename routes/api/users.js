const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    createFriend,
    deleteFriend
} = require('../../controllers/userControllers')

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById);

router.route('/:userId/friends/:friendId').post(createFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;