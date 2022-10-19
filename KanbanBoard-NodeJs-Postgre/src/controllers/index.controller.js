const {Pool} = require("pg");
const e = require("express");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "kanbanboard",
    password: "123456",
    port: 5432,
});

const getTasks = async (req, res, next) => {
    try {
        const {search, status} = req.query;
        let response;
        if (status === "backlog") {
            const query = `SELECT id, title, description, status, issue_type, priority_type, reporter_id, assignee_id 
        FROM tasks WHERE is_delete = false AND title iLIKE '%'||$1||'%' AND status = 'BACKLOG'
        ORDER BY updated_At ASC`;
            response = await pool.query(query, [search]);
        } else {
            const query = `SELECT id, title, description, status, issue_type, priority_type, reporter_id, assignee_id 
        FROM tasks WHERE is_delete = false AND title iLIKE '%'||$1||'%' ORDER BY updated_At ASC`;
            response = await pool.query(query, [search]);
        }
        res.status(200).json(response.rows);
    } catch (error) {
        next(responseError(error));
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const id = +req.params.id;
        if (typeof id === 'number' && !isNaN(id)) {
            const response = await pool.query(
                `SELECT id, title, description, status, issue_type, priority_type, reporter_id,
        assignee_id FROM tasks where is_delete = false and id = $1`,
                [id]
            );
            if (response.rows.length > 0) {
                res.status(200).json(response.rows);
            } else {
                next(responseError("Item requested was not found", 404));
            }
        } else {
            next(responseError("Invalid input id syntax", 400));
        }

    } catch (error) {
        next(responseError(error));
    }
};

const createTask = async (req, res, next) => {
    try {
        const {title, description, status, issue_type, priority_type, reporter_id, assignee_id} = req.body;
        const query = `INSERT INTO tasks(title, description, status, issue_type, priority_type, reporter_id,
        assignee_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
        const response = await pool.query(query, [
            title,
            description,
            status,
            issue_type,
            priority_type,
            reporter_id,
            assignee_id,
        ]);
        res.status(201).json({
            message: "Task Add Successfully",
        });
    } catch (error) {
        next(responseError(error));
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const id = +req.params.id;
        if (typeof id === 'number' && !isNaN(id)) {
            const selectTask = await pool.query('SELECT * FROM tasks WHERE id = $1 and "is_delete" = false', [id]);
            if (selectTask.rows.length > 0) {
                const response = await pool.query('UPDATE tasks SET "is_delete" = true  WHERE id= $1', [id]);
                res.status(200).json({
                    message: `Task deleted successfully`,
                });
            } else {
                next(responseError("Item requested was not found", 404));
            }
        } else {
            next(responseError("Invalid input id syntax", 400));
        }
    } catch (error) {
        next(responseError(error));
    }
};

const updateTask = async (req, res, next) => {
    try {
        const id = +req.params.id;
        if (typeof id === 'number' && !isNaN(id)) {
            const {title, description, status, issue_type, priority_type, reporter_id, assignee_id} = req.body;
            const selectTask = await pool.query('SELECT * FROM tasks WHERE id = $1 and "is_delete" = false', [id]);
            if (selectTask.rows.length > 0) {
                const response = await pool.query(
                    `UPDATE tasks SET title=$1, description=$2, status=$3, issue_type=$4, priority_type=$5,
        reporter_id=$6, assignee_id=$7 WHERE id = $8`,
                    [title, description, status, issue_type, priority_type, reporter_id, assignee_id, id]
                );
                res.status(200).json({
                    message: "Todo updated successfully",
                });
            } else {
                next(responseError("Item requested was not found", 404));
            }
        } else {
            next(responseError("Invalid input id syntax", 400));
        }
    } catch (error) {
        next(responseError(error));
    }
};

const getUsers = async (req, res) => {
    try {
        const response = await pool.query(
            `SELECT id,fullname,email FROM users where "is_delete" = false ORDER BY updated_at ASC`
        );
        res.status(200).json(response.rows);
    } catch (error) {
        next(responseError(error));
    }
};

const responseError = (message, code) => {
    const error = new Error(message);
    error.status = code;
    return error;
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask,
    getUsers,
};
