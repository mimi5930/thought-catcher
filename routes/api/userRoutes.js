const router = require('express').Router();
const {
	getUsers,
	createUser,
	deleteUser
} = require('../../controller/user-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

router.route('/:id').delete(deleteUser);

module.exports = router;
