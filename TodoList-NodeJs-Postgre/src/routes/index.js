const {Router} = require('express');
const router = Router();
const {idValid, validate, todoValid, updateTodoValid} = require("../middlewares/validator");

const {getTodos, deleteTodo, updateTodo, createTodo, getTodoById} = require('../controllers/index.controller');

router.get('/api/todos', getTodos);
router.get('/api/todos/:id', idValid, validate, getTodoById);
router.post('/api/todos', todoValid, validate, createTodo);
router.put('/api/todos/:id', updateTodoValid, validate, updateTodo);
router.delete('/api/todos/:id', idValid, validate, deleteTodo);

module.exports = router;