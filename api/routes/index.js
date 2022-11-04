
const router = require('express').Router();

router.use('/api', (req, res) => { res.send(['Welcome to API']) });
router.use('/entity', require('./entity'));
router.use('/feed', require('./feed'));
router.use('/charts', require('./charts'));

module.exports = router;