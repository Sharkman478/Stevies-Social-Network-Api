const { Thought } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.json({ message: `Problem getting all thoughts ${err.message}` });
    }
  },
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (thought == null) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      res.json(thought);
    } catch (err) {
      res.json({ message: `Problem getting thought by Id ${err.message}` });
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.json({ message: `Problem creating thought ${err.message}` });
    }
  },
  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.json({ message: `Problem updating thought by Id ${err.message}` });
    }
  },
  async deleteThoughtById(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that Id" });
      }
      res.json({ message: "Thought was deleted" });
    } catch (err) {
      res.json({ message: `problem deleting thought by Id ${err.message}` });
    }
  },
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought
        ? res.json(thought)
        : res.status(404).json({ message: "notFound" });
    } catch (err) {
      res.json({ message: `Problem creating reaction ${err.message}` });
    }
  },
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res
          .status(404)
          .json({ message: "No thought or reaction with this id" });
      }
      res.json(thought);
    } catch (err) {
      res.json({ message: `Problem trying to remove reaction ${err.message}` });
    }
  }
};
