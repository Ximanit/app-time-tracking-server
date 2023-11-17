const router = require('express-promise-router')();
const { workTask } = require('../controllers');

router.route('/').get(workTask.getAll);
router.route('/:id').get(workTask.get);
router.route('/').post(workTask.create);
router.route('/:id').put(workTask.update);
router.route('/onpause/:id').patch(workTask.onPause);
router.route('/offpause/:id').patch(workTask.offPause);

module.exports = router;
