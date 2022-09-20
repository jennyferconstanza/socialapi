const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");
// functions gets # of thoughts
const numThoughts = async () =>
  Thought.aggregate().count("thoughtCount").then((allThoughts) => allThoughts);

module.exports = {
  // get thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObject = {
          thoughts,
          numThoughts: await numThoughts(),
        };
        return res.json(thoughtObject);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
// get single thought by id
 getSingleThought(req,res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) => !thought ? res.status(404).json({ message: "Thought not found." })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });      
},
// create new thought
 updateThought(req,res) {
    Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => !thought ? res.status(404).json({ message: 'Thought not found.' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
},
// delete thought
 deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(() => res.status(200).json({ message: 'Deletion successful.' }))
            .catch((err) => res.status(500).json(err));
 },
 // create reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => !thought ? res.status(404).json({ message: 'Thought not found.' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
  },
   deleteReaction(req, res) {
         Thought.findOneAndUpdate(
           { _id: req.params.thoughtId },
           { $pull: { reactions: { _id: req.params.reactionId } } },
           { runValidators: true, new: true }
         )
           .then((thought) => {
             console.log(thought); !thought ? res.status(404).json({ message: "Thought not found." })
               : res.json(thought);
           })
           .catch((err) => res.status(500).json(err));
   }
};