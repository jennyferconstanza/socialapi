const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");
// functions gets # of thoughts
const numThoughts = async () =>
  Thought.aggregate()
    .count("thoughtCount")
    .then((allThoughts) => allThoughts);

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
getSingleThoughtById(req,res) {

    
}








};