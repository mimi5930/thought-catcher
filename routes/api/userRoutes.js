const router = require('express').Router();
const {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
} = require('../../controller/user-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);

module.exports = router;
