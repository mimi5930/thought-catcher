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
			.then(dbUserData => res.json(dbUserData))
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

	// delete User
	deleteUser({ params }, res) {
		User.deleteOne({ _id: params.id })
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				res.status(400).json(err);
			});
	}
};

module.exports = userController;
