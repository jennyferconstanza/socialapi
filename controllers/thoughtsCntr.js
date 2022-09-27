const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");
 
const totalThoughts = async () =>
    Thought.aggregate()
        .count('thoughtCount')
        .then((allThoughts) => allThoughts);

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          totalThoughts: await totalThoughts(),
        };

        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // gets single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID!" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
// create thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: dbThought._id } },
          { new: true }
        );
      })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
// update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
// delete thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(() =>
        res.status(200).json({ message: "User deleted successfully" })
      )
      .catch((err) => res.status(500).json(err));
  },
// create reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
// delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        console.log(thought);
        !thought
          ? res.status(404).json({ message: "No thought found with that ID!" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};
