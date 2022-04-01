const { User, Thought } = require('../models');

const userController = {
	// get all Users
	getUsers(req, res) {
		User.find({})
			.populate({
				path: 'thoughts',
				select: '-__v'
			})
			.select('-__v')
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				res.status(400).json(err);
			});
	},

	// get a user by Id
	getUserById(req, res) {
		User.findById(req.params.id)
			.populate({
				path: 'thoughts',
				select: '-__v'
			})
			.populate({
				path: 'friends',
				select: '-__v'
			})
			.select('-__v')
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

	// post new user
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
	async deleteUser(req, res) {
		try {
			const UserData = await User.findOne({ _id: req.params.id });
			const deleteUser = await User.deleteOne({ _id: req.params.id });
			const deleteThoughts = await Thought.deleteMany({
				username: UserData.username
			});
			res.json({ deleteUser, deleteThoughts });
		} catch (error) {
			res.status(400).json(err);
		}
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
