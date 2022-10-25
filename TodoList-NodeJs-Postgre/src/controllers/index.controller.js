const pool = require("../config");
const {idValid, validate} = require("../middlewares/validator");
const {responseError} = require("../shared/handleError");

const getTodos = async (req, res, next) => {
    try {
        const response = await pool.query(
            `SELECT id,title,is_done FROM todos where status = false ORDER BY "updated_at" ASC`
        );
        res.status(200).json(response.rows);
    } catch (error) {
        next(new Error(error));
    }
};

const getTodoById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM todos WHERE id = $1 and status = false', [id]);
        if (response.rows.length > 0) {
            res.status(200).json(response.rows);
        } else {
            next(responseError("Item requested was not found", 404));
        }
    } catch (error) {
        next(new Error(error));
    }
};

const createTodo = async (req, res, next) => {
    try {
        const {title, is_done} = req.body;
        const response = await pool.query('INSERT INTO todos(title, is_done) VALUES($1, $2)', [title, is_done]);
        res.status(201).json({
            message: "Todo Add Successfully",
            data: {
                todo: {title, is_done},
            },
        });
    } catch (error) {
        next(new Error(error));
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const selectTodo = await pool.query('SELECT * FROM todos WHERE id = $1 and status = false', [id]);
        if (selectTodo.rows.length === 0) {
            return next(responseError("Item requested was not found", 404));
        } else {
            const response = await pool.query('UPDATE todos SET status = true  WHERE id= $1', [id]);
            res.status(200).json({
                message: `Todo deleted successfully`,
            });
        }
    } catch (error) {
        next(new Error(error));
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {title, is_done} = req.body;
        const selectTodo = await pool.query('SELECT * FROM todos WHERE id = $1 and status = false', [id]);
        if (selectTodo.rows.length === 0) {
            return next(responseError("Item requested was not found", 404));
        } else {
            const response = await pool.query('UPDATE todos SET title = $1, is_done=$2 WHERE id = $3', [title, is_done, id]);
            res.status(200).json({
                message: "Todo updated successfully",
            });
        }
    } catch (error) {
        next(new Error(error));
    }
};

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
};
