const pool = require("../config");
const { responseError } = require("../shared/handleError");

const getTasks = async (req, res, next) => {
  try {
    const { search, type } = req.query;
    let response;
    if (type === "backlog") {
      const query = `
        SELECT tasks.id, tasks.title, tasks.description, tasks.task_status, tasks.issue_type, tasks.priority_type,
            tasks.reporter_id, tasks.assignee_id,users.fullname as assignee_fullname
        FROM tasks 
        LEFT JOIN users ON users.id = tasks.assignee_id 
        WHERE tasks.status = false AND 
        title iLIKE '%'||$1||'%' ORDER BY tasks.updated_At ASC`;
      response = await pool.query(query, [search]);
    } else {
      const query = `
        SELECT tasks.id, tasks.title, tasks.description, tasks.task_status, tasks.issue_type, tasks.priority_type,
        tasks.reporter_id, tasks.assignee_id,users.fullname as assignee_fullname
        FROM tasks LEFT JOIN users ON users.id = tasks.assignee_id WHERE tasks.status = false AND 
        title iLIKE '%'||$1||'%' AND task_status <> 'BACKLOG' ORDER BY tasks.updated_At ASC`;
      response = await pool.query(query, [search]);
    }
    res.status(200).json(response.rows);
  } catch (error) {
    next(responseError(error));
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      `SELECT t.id, t.title, t.description, t.task_status, t.issue_type, t.priority_type, t.reporter_id,t.assignee_id , 
                u1.fullname as reporter_fullname, u2.fullname as assignee_fullname
                FROM tasks as t
                LEFT JOIN users AS u1 ON u1.id = t.reporter_id LEFT JOIN users AS u2 ON u2.id = t.assignee_id 
                WHERE t.status = false AND t.id = $1`,
      [id]
    );
    if (response.rows.length > 0) {
      res.status(200).json(response.rows[0]);
    } else {
      return next(responseError("Item requested was not found", 404));
    }
  } catch (error) {
    next(responseError(error));
  }
};

const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      task_status,
      issue_type,
      priority_type,
      reporter_id,
      assignee_id,
    } = req.body;
    const query = `INSERT INTO tasks(title, description, task_status, issue_type, priority_type, reporter_id,
        assignee_id) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
    await pool.query(query, [
      title,
      description,
      task_status,
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
    const id = req.params.id;
    const selectTask = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 and status= false",
      [id]
    );
    if (selectTask.rows.length === 0) {
      return next(responseError("Item requested was not found", 404));
    } else {
      const response = await pool.query(
        "UPDATE tasks SET status = true  WHERE id= $1",
        [id]
      );
      res.status(200).json({
        message: `Task deleted successfully`,
      });
    }
  } catch (error) {
    next(responseError(error));
  }
};

const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      task_status,
      issue_type,
      priority_type,
      assignee_id,
    } = req.body;
    const selectTask = await pool.query(
      "SELECT id FROM tasks WHERE id = $1 and status = false",
      [id]
    );
    if (selectTask.rows.length === 0) {
      return next(responseError("Item requested was not found", 404));
    } else {
      const response = await pool.query(
        `UPDATE tasks SET title=$1, description=$2, task_status=$3, issue_type=$4, priority_type=$5,
                    assignee_id=$6 WHERE id = $7`,
        [
          title,
          description,
          task_status,
          issue_type,
          priority_type,
          assignee_id,
          id,
        ]
      );
      res.status(200).json({
        message: "Task updated successfully",
      });
    }
  } catch (error) {
    next(responseError(error));
  }
};

const changeStatusTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { task_status } = req.body;
    const selectTask = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 and status = false",
      [id]
    );
    if (selectTask.rows.length === 0) {
      return next(responseError("Item requested was not found", 404));
    } else {
      const response = await pool.query(
        `UPDATE tasks SET task_status=$1 WHERE id = $2`,
        [task_status, id]
      );
      res.status(200).json({
        message: "Change status successfully",
      });
    }
  } catch (error) {
    next(responseError(error));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const response = await pool.query(
      `SELECT id,fullname,email FROM users where status = false ORDER BY updated_at ASC`
    );
    res.status(200).json(response.rows);
  } catch (error) {
    next(responseError(error));
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
  getUsers,
  changeStatusTask,
};
