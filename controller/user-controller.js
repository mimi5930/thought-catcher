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

	createUser(req, res) {
		User.create(req.body)
			.then(dbUserData => res.json(dbUserData))
			.catch(err => {
				res.status(400).json(err);
			});
	}
};

module.exports = userController;
