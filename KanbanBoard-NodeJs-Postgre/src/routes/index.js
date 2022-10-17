const {Router} = require("express");
const router = Router();

const {
    getTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask,
    getUsers
} = require("../controllers/index.controller");

router.get("/api/kanbanboard", getTasks);
router.get("/api/kanbanboard/:id", getTaskById);
router.post("/api/kanbanboard", createTask);
router.delete("/api/kanbanboard/:id", deleteTask);
router.put("/api/kanbanboard/:id", updateTask);
router.get('/api/users', getUsers);

module.exports = router;
