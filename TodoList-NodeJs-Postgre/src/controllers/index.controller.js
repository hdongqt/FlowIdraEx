const pool = require("../config");
const {idValid, validate} = require("../middlewares/validator");
const {responseError} = require("../shared/handleError");

const getTodos = async (req, res, next) => {
    try {
        const response = await pool.query(
            `SELECT id,title,"isDone" FROM todos where "isDelete" = false ORDER BY "updatedAt" ASC`
        );
        res.status(200).json(response.rows);
    } catch (error) {
        next(new Error(error));
    }
};

const getTodoById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM todos WHERE id = $1 and "isDelete" = false', [id]);
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
        const {title, isDone} = req.body;
        const response = await pool.query('INSERT INTO todos(title, "isDone") VALUES($1, $2)', [title, isDone]);
        res.status(201).json({
            message: "Todo Add Successfully",
            data: {
                todo: {title, isDone},
            },
        });
    } catch (error) {
        next(new Error(error));
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const selectTodo = await pool.query('SELECT * FROM todos WHERE id = $1 and "isDelete" = false', [id]);
        if (selectTodo.rows.length === 0) {
            return next(responseError("Item requested was not found", 404));
        } else {
            const response = await pool.query('UPDATE todos SET "isDelete" = true  WHERE id= $1', [id]);
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
        const {title, isDone} = req.body;
        const selectTodo = await pool.query('SELECT * FROM todos WHERE id = $1 and "isDelete" = false', [id]);
        if (selectTodo.rows.length === 0) {
            return next(responseError("Item requested was not found", 404));
        } else {
            const response = await pool.query('UPDATE todos SET title = $1, "isDone"=$2 WHERE id = $3', [title, isDone, id]);
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
