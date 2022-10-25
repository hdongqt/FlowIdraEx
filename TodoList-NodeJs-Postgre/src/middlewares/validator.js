const {validationResult, param, check} = require('express-validator');
const {responseError} = require("../shared/handleError");

const todoValid = [
    check("title").trim().toLowerCase()
        .isLength({min: 5, max: 25}).withMessage('Title must be 5 to 50 characters long')
        .custom(value=>{
            if(value.includes('fuck')){
                throw new Error('Title is not allowed');
            }
            return true;
        }),
    check("is_done")
        .isBoolean().withMessage('Status todo is not valid')
]

const idValid = [
    param('id').isInt().withMessage('Id must be a number'),
]

const updateTodoValid = [...idValid, ...todoValid]

const validate = (req, res, next) => {
    const error = validationResult(req).array().map(item => item.msg)
    if (error.length) {
        return next(responseError(error, 400))
    } else {
        return next()
    }
}

module.exports = {
    todoValid,
    idValid,
    updateTodoValid,
    validate
}
