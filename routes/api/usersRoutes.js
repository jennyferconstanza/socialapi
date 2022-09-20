const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUsers,
  deleteUser,
  createUser,
  deleteFriend,
} = require("../../controllers/usersCntr");
// GETS all users
router.route("/").get(getUsers);
// GET single user by id
router.route("/:userId").get(getSingleUser);
// POST a new user
router.route("/").post(createUser);
// PUT update user by id
router.route("/:userId").put(updateUser);
// DELETE user by id
router.route("/:userId").delete(deleteUser);

// POST new friend
router.route("/:userId").delete(deleteUser);
// DELETE friend
router.route("/:userId/friends/:friendId").delete(deleteFriend);
module.exports = router;
