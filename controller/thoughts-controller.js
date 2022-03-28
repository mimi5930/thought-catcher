const { Thought } = require('../models');

const thoughtsController = {
	// get all thoughts
	getThoughts(req, res) {
		Thought.find()
			.then(dbThoughtData => res.json(dbThoughtData))
			.catch(err => {
				res.status(400).json(err);
			});
	}
};

module.exports = thoughtsController;
