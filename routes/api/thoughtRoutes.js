const router = require('express').Router();
const {
	getThoughts,
	getThoughtbyId,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	removeReaction
} = require('../../controller/thoughts-controller');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router
	.route('/:id')
	.get(getThoughtbyId)
	.put(updateThought)
	.delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;
