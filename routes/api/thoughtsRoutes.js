const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsCntr');
const { create } = require("../../models/User");
// GET for all thoughts
router.route("/").get(getThoughts);
// GET single thought by id
router.route("/:thoughtId").get(getSingleThought);
// POST to create new thought
router.route("/").post(createThought);
// PUT to update thought by id
router.route("/:thoughtId").put(updateThought);
//DELETE to remove a thought by id
router.route("/:thoughtId").delete(deleteThought);

//POST create reactione, store in arr
router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
module.exports = router;

