const { body } = require("express-validator");
const constants = require("../constants");

const signupValidator = () => {
    return [
        body("name").isString().withMessage("Name should be a string"),
        body("email").isEmail().withMessage("Email should be valid"),
        body("gender")
            .isIn(Object.values(constants.Gender))
            .withMessage("gender should be valid")
            .optional(),
        body("password")
            .isString()
            .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,32}$")
            .withMessage(
                "password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
            ),
    ];
};

const loginValidator = () => {
    return [
        body("email").isEmail().withMessage("Email should valid"),
        body("password").isString().withMessage("̦Password is required"),
    ];
};

module.exports = {
    signupValidator,
    loginValidator,
};
