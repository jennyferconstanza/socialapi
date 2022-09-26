const router = require("express").Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtsCntr');

// GET for all thoughts
router.route("/").get(getAllThoughts);
// GET single thought by id, update thought, delete thought
router.route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought); 

// create thought 
router.route("/:userId").post(createThought);
// post reaction 
router.route("/:thoughtId/reactions").post(addReaction);

// deletr reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;

