const {validationResult, param, check} = require('express-validator');
const {responseError} = require("../shared/handleError");
const {TASK_STATUS, ISSUE_TYPE, PRIORITY_TYPE} = require("../shared/constant");

const taskMainValid = [
    check("title").trim().not().isEmpty().withMessage("Title is missing")
        .isLength({min: 5, max: 50}).withMessage('Title must be 5 to 50 characters long'),
    check("description").trim().not().isEmpty().withMessage('Description is missing')
        .isLength({min: 5, max: 150}).withMessage('Description must be 5 to 150 characters long'),
    check("assignee_id").isInt().withMessage('Assignee not valid'),
    check("issue_type").isIn(ISSUE_TYPE).withMessage('Type issue must be TASK | BUG | STORY | EPIC'),
    check("priority_type").isIn(PRIORITY_TYPE).withMessage('Type issue must be LOWEST | LOW | MEDIUM | HIGH |HIGHEST'),
]

const taskStatusValid = [
    check("task_status").isIn(TASK_STATUS).withMessage('Task status must be BACKLOG | INPROGRESS | TODO | DONE')
]

const createTaskValid = [...taskMainValid,
    check("reporter_id").isInt().withMessage('Reporter not valid'),
    check("task_status").equals('BACKLOG').withMessage('Task status must be BACKLOG')
]

const idValid = [
    param('id').isInt().withMessage('Id must be a number'),
]

const updateTaskValid = [
    ...idValid, ...taskMainValid,
    ...taskStatusValid
]

const changeStatusTaskValid = [...idValid,...taskStatusValid]

const validate = (req, res, next) => {
    const error = validationResult(req).array().map(item => item.msg)
    if (error.length) {
        return next(responseError(error, 400))
    } else {
        return next()
    }
}

module.exports = {
    createTaskValid,
    changeStatusTaskValid,
    idValid,
    updateTaskValid,
    validate
}
