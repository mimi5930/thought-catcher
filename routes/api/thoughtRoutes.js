const router = require('express').Router();
const { getThoughts } = require('../../controller/thoughts-controller');

router.route('/').get(getThoughts);

module.exports = router;
