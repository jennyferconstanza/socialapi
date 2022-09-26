const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/usersCntr");

// GETS all users
router.route("/").get(getAllUsers).post(createUser);

// get user, update user, delete user
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// add friend, delete friend
router.route("/:id/friends/:friendId").put(addFriend).delete(deleteFriend);

module.exports = router;
