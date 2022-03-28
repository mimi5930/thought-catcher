const router = require('express').Router();
const {
	getThoughts,
	getThoughtbyId,
	createThought,
	updateThought,
	deleteThought
} = require('../../controller/thoughts-controller');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router
	.route('/:id')
	.get(getThoughtbyId)
	.put(updateThought)
	.delete(deleteThought);

module.exports = router;
