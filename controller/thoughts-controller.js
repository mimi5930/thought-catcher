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

	// get a thought by id
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

	// post new thought
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

	// update thought data
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

	// delete thought
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
	},

	// Post a reaction
	addReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{
				$push: { reactions: req.body }
			},
			{
				new: true,
				runValidators: true
			}
		)
			.then(dbReactionData => {
				if (!dbReactionData) {
					res.status(404).json({ message: `No thought found with this Id` });
				}
				res.json(dbReactionData);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	},

	// remove Reaction
	removeReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{
				$pull: { reactions: { reactionId: req.params.reactionId } }
			},
			{ new: true }
		)
			.then(dbReactionData => {
				res.json(dbReactionData);
			})
			.catch(err => {
				res.json(err);
			});
	}
};

module.exports = thoughtsController;
