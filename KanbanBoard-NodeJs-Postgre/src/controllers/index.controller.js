const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "kanbanboard",
    password: "123456",
    port: 5432,
})

const getTasks = async (req, res) => {
    try {
        const response = await pool.query(`SELECT id, title, description, status, issue_type, priority_type, reporter_id,
        assignee_id FROM tasks where is_delete = false ORDER BY updated_At ASC`);
        res.status(200).json(response.rows);
    } catch (error) {
        res.json({
            message: "Error: " + error
        });
    }
};

module.exports = {
    getTasks,
}