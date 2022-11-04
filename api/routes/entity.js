const EntityController = require('../controllers/entity');

const router = require('express').Router();
router.route('/').get( EntityController.find )
router.route('/find').get( EntityController.find )
router.route('/find/:feedName').get( EntityController.findByFeedName )
router.route('/clear').get( EntityController.clear )

module.exports = router;