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
router.route("/").get(getUsers);
router.route("/").post(createUser);

// get user, update user, delete user
router.route("/:userId").get(getSingleUser);

router.route("/:userId").put(updateUser);
router.route("/:userId").delete(deleteUser);

// add friend, delete friend
router.route("/:userid/friends/:friendId").put(createFriend);
router.route("/:userid/friends/:friendId").delete(deleteFriend);

module.exports = router;
