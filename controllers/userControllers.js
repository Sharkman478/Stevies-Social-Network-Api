const { User } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.json({ message: `Problem getting all users ${err.message}` });
    }
  },
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (user == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.json(user);
    } catch (err) {
      res.json({ message: `Problem getting user by Id ${err.message}` });
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.json({ message: `Problem creating User ${err.message}` });
    }
  },
  updateUserById: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUserById(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: "No user with that Id" });
      }
      res.json({ message: "User was deleted" });
    } catch (err) {
      res.json({ message: `Problem deleting user by Id ${err.message}` });
    }
  },
  async createFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { new: true }
      );
  
      user
        ? res.json({
            message: `${user.username} and ${friend.username} are now friends!`,
          })
        : res.status(404).json({ message: "notFound" });
    } catch (err) {
      res.json({ message: `Problem creating friend ${err.message}` });
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
  
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      );
  
      if (!user || !friend) {
        res.status(404).json({ message: "No user or friend with this id" });
      }
      res.json({ user, friend });
    } catch (err) {
      res.json({ message: `Problem trying to remove friend ${err.message}` });
    }
  },
};
