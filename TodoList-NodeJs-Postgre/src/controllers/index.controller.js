const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todolist",
    password: "123456",
    port: 5432,
})

const getTodos = async (req, res) => {
    try {
        const response = await pool.query(`SELECT id,title,"isDone" FROM todos where "isDelete" = false`);
        res.status(200).json(response.rows);
    } catch (error) {
        res.send("Error: " + error);
    }
};

const getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM todos WHERE id = $1 and "isDelete" = false', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.send("Error: " + error);
    }
};

const createTodo = async (req, res) => {
    try {
        const {title, isDone} = req.body;
        const response = await pool.query('INSERT INTO todos(title, "isDone") VALUES($1, $2)', [title, isDone]);
        console.log(response);
        res.status(201).json({
            message: 'Todo Add Successfully',
            data: {
                todo: {title, isDone}
            }
        });
    } catch (error) {
        res.send("Error: " + error);
    }
};

const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query('UPDATE todos SET "isDelete" = true  WHERE id= $1', [id]);
        res.status(200).json(`User deleted successfully`);
    } catch (error) {
        res.send("Error: " + error);
    }
};

const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const {title, isDone} = req.body;
        const response = await pool.query('UPDATE todos SET title = $1, "isDone"=$2 WHERE id = $3', [title, isDone, id]);
        res.status(200).json('User updated successfully');
    } catch (error) {
        res.send("Error: " + error);
    }
}

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
}