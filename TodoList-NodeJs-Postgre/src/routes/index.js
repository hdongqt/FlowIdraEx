const {Router} = require('express');
const router = Router();

const {getTodos, deleteTodo, updateTodo, createTodo, getTodoById} = require('../controllers/index.controller');

router.get('/api/todos', getTodos);
router.get('/api/todos/:id', getTodoById);
router.post('/api/todos', createTodo);
router.put('/api/todos/:id', updateTodo);
router.delete('/api/todos/:id', deleteTodo);

module.exports = router;