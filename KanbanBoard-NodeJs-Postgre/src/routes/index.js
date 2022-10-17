const {Router} = require('express');
const router = Router();

const {getTasks} = require('../controllers/index.controller');

router.get('/api/kanbanboard', getTasks);


module.exports = router;