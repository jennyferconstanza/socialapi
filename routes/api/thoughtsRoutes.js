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

// GET for all thoughts
router.route("/").get(getThoughts);
// GET single thought by id, update thought, delete thought
router.route("/:thoughtId").get(getSingleThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").delete(deleteThought); 

// create thought 
router.route("/").post(createThought);
// post reaction 
router.route("/:thoughtId/reactions").post(createReaction);

// deletr reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;

