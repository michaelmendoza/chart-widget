const { create, find } = require('../controllers/feed');

const router = require('express').Router();
router.route('/').get(find);
router.route('/find').get(find);
router.route('/create').post(create);

module.exports = router;
