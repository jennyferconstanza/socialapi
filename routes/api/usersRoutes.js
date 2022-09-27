const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../controllers/usersCntr");

// GETS all users
router.route("/").get(getUsers).post(createUser);

// get user, update user, delete user
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// add friend, delete friend
router.route("/:id/friends/:friendId").put(createFriend).delete(deleteFriend);

module.exports = router;
