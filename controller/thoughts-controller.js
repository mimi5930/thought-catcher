const { Thought, User } = require('../models');

const thoughtsController = {
	// get all thoughts
	getThoughts(req, res) {
		Thought.find()
			.then(dbThoughtData => res.json(dbThoughtData))
			.catch(err => {
				res.status(400).json(err);
			});
	},

	getThoughtbyId(req, res) {
		Thought.findById(req.params.id)
			.then(dbThoughtData => {
				if (!dbThoughtData) {
					res
						.status(404)
						.json({ message: `No thought with the id ${req.params.id}` });
				}
				res.json(dbThoughtData);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	},

	createThought(req, res) {
		Thought.create(req.body)
			.then(dbThoughtData => {
				return User.findOneAndUpdate(
					{ username: req.body.username },
					{ $push: { thoughts: dbThoughtData._id } },
					{ new: true, runValidators: true }
				);
			})
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: `No User found with this id!` });
				}
				res.json(dbUserData);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	},

	updateThought(req, res) {
		Thought.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})
			.then(dbThoughtData => {
				if (!dbThoughtData) {
					res.status(404).json({
						message: `No Thought with the id of ${req.params.id} found!`
					});
				}
				res.json(dbThoughtData);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	},

	deleteThought(req, res) {
		Thought.findByIdAndDelete(req.params.id)
			.then(dbThoughtData => {
				return User.findOneAndUpdate(
					{ username: dbThoughtData.username },
					{ $pull: { thoughts: { _id: req.params.id } } },
					{ new: true }
				);
			})
			.then(dbUserData => {
				res.json(dbUserData);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	}
};

module.exports = thoughtsController;
