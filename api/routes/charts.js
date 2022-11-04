const ChartsController = require('../controllers/charts');

const router = require('express').Router();
router.route('/create').post( ChartsController.create )
router.route('/find').get( ChartsController.find )

module.exports = router;
