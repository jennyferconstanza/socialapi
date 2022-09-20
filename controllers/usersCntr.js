const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

// get total num of users

const totalUsers = async () =>
    User.aggregate().count("userCount").then((allUsers) => allUsers);

module.exports = {
    // gets all users
    getUsers(req,res) {
        User.find()
          .then(async (users) => {
            const usersObject = {
              users,
              totalUsers: await totalUsers(),
            };

            return res.json(usersObject);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    //get single user
    getSingleUser(req, res) {
         User.findOne({ _id: req.params.userId })
           .select("=======")
           .then(async (user) => 
           !user 
           ? res.status(404).json({ message: "User not found." }) 
           : res.json(user)
           )
           .catch((err) => {
             console.log(err);
             return res.status(500).json(err);
           });
    },
    // create user
    createUser(req, res) {
         User.create(req.body)
           .then((user) => res.json(user))
           .catch((err) => res.status(500).json(err));
    },
    // update user
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) => 
          !user 
          ? res.status(404).json({ message: "User not found." }) 
          : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    },
    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then(() => res.status(200).json({ message: "Deletion successful." }))
          .catch((err) => res.status(500).json(err));
    },
    // create new friend
    createFriend(req, res) {
         User.findOneAndUpdate(
           { _id: req.params.userId },
           { $addToSet: { friends: req.params.friendId } },
           { runValidators: true, new: true }
         )
           .then((user) => 
           !user 
           ? res.status(404).json({ message: "No user found." }) 
           : res.json(user)
           )
           .catch((err) => res.status(500).json(err));
    },
    // remove a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) => {
            console.log(user);
            !user
              ? res.status(404).json({ message: "User not found." })
              : res.json(user);
          })
          .catch((err) => res.status(500).json(err));
    }
}