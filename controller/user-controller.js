const { User } = require('../models');

const userController = {
	// get all Users
	getUsers(req, res) {
		User.find({})
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				res.status(400).json(err);
			});
	},

	getUserById(req, res) {
		User.findById(req.params.id)
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No User found with this ID' });
				}
				res.json(dbUserData);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	},

	createUser(req, res) {
		User.create(req.body)
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				res.status(400).json(err);
			});
	},

	// update User Data
	updateUser(req, res) {
		User.findOneAndUpdate({ id: req.params.id }, req.body, {
			new: true,
			runValidators: true
		})
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				res.status(400).json(err);
			});
	},

	// delete User
	// TODO Delete user's associated thoughts when deleted
	deleteUser(req, res) {
		User.deleteOne({ _id: req.params.id })
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				res.status(400).json(err);
			});
	},

	// add friend
	addFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $push: { friends: req.params.friendId } },
			{ new: true, runValidators: true }
		)
			.then(dbUserData => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No User found with this ID' });
				}
				res.json(dbUserData);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	},

	// remove friend
	removeFriend(req, res) {
		User.findOneAndUpdate(
			{ _id: req.params.userId },
			{
				$pull: { friends: req.params.friendId }
			},
			{ new: true, runValidators: true }
		)
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				res.status(400).json(err);
			});
	}
};

module.exports = userController;
