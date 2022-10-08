const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts');

router.route('/')
    .get(getAllThoughts);

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router.route('/:userId')
    .post(createThought);

router.route('/:id/reactions')
    .post(addReaction);

router.route('/:id/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;