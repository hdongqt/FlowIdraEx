const {Router} = require("express");
const router = Router();
const {idValid, validate, createTaskValid, updateTaskValid, changeStatusTaskValid} = require("../middlewares/validator");

const {
    getTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask,
    getUsers, changeStatusTask
} = require("../controllers/index.controller");

router.get("/api/kanbanboard", getTasks);
router.get("/api/kanbanboard/:id", idValid, validate, getTaskById);
router.post("/api/kanbanboard", createTaskValid, validate, createTask);
router.delete("/api/kanbanboard/:id", idValid, validate, deleteTask);
router.put("/api/kanbanboard/:id", updateTaskValid, validate, updateTask);
router.put("/api/kanbanboard/changestatus/:id", changeStatusTaskValid, validate, changeStatusTask);
router.get('/api/users', getUsers);

module.exports = router;
