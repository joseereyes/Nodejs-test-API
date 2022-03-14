const { body, check, param, validationResult } = require('express-validator');

const createUserValidationRules = () => {

    return [
        body("firstName").isString().withMessage("First Name is empty").isLength({ min: 1 }).withMessage("First Name is empty"),
        body("lastName").isString().withMessage("Last Name is empty").isLength({ min: 1 }).withMessage("First Name is empty"),
        body("email").isEmail().withMessage("Please validate your email"),
        check("password").custom((value, { req }) => {

            if (value !== req.body.passwordConfirmation) {
                throw new Error("Passwords confirmation does not match");
            }
            return true

        })
    ]
}

const updateUserValidationRules = () => {
    return [
        param("id").isMongoId().withMessage("Your mongo id is invalid"),
        body("firstName").isString().withMessage("First Name is empty or invalid").isLength({ min: 1 }).withMessage("First Name is empty").optional(),
        body("lastName").isString().withMessage("Last Name is empty or invalid").isLength({ min: 1 }).withMessage("First Name is empty").optional(),
        body("email").isEmail().withMessage("Please validate your email").optional(),
        check("password").custom((value, { req }) => {

            if (value !== req.body.passwordConfirmation) {
                throw new Error("passwordConfirmation value does not match with password value");
            }
            return true

        }).optional(),
        body("role").isString().withMessage("Please insert a valid role").custom((value, { req }) => {
            const roles = ["Admin", "User"].includes(req.body.role)
            if (!roles) {
                throw new Error("Please insert a valid role")
            }
            return true
        }).optional()
    ]
}

const validation = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const validation_errors = [errors.array().map((error) => {

        return ({
            [error.param]: error.msg
        })

    })]

    return res.status(422).json({ validation_errors })
}
module.exports = { validation, createUserValidationRules, updateUserValidationRules }