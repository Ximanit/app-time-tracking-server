const router = require('express-promise-router')();
const { task } = require('../controllers')

router.route('/').get(task.getAll);
router.route('/:id').get(task.get);
router.route('/').post(task.create);
router.route('/:id').put(task.update);

module.exports = router;