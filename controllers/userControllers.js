const { User, Thought } = require('../models');

module.exports ={
    async getAllUsers(req, res) {
        try {
            const user = await User.find();
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' });
            }
            res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.courseId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(user);
        }  catch (err) {
            res.status(500).jason(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.courseId });
            if (!user) {
                res.status(404).json({ message: 'No user with that Id' });
            }
            res.json({ message: 'User was deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}