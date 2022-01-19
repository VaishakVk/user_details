const { validationResult } = require("express-validator");
const { StatusCode } = require("../../constants");
const { errorResponse, successResponse } = require("../../formatter");
const authRepo = require("./repo");

/**
 * @description Handler to signup
 * @param req
 * @param res
 * @returns
 */
const signupHandler = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, StatusCode.BadRequest, errors.array());
        }

        const results = await authRepo.createUser(req.body);
        return successResponse(res, StatusCode.Created, {
            message: "User created successfully",
            id: results._id,
        });
    } catch (err) {
        return errorResponse(res, err.statusCode, err);
    }
};

/**
 * @description Login
 * @param req
 * @param res
 * @returns
 */
const loginHandler = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errorResponse(res, StatusCode.BadRequest, errors.array());
        }
        const { email, password } = req.body;
        const token = await authRepo.login(email, password);
        return successResponse(res, StatusCode.Ok, {
            token,
        });
    } catch (err) {
        return errorResponse(res, err.statusCode, err);
    }
};

/**
 * @description My Profile
 * @param req
 * @param res
 * @returns
 */
const getMyProfileHandler = async (req, res) => {
    try {
        const userData = await authRepo.getMyProfileData(req.userId);
        return successResponse(res, StatusCode.Ok, userData);
    } catch (err) {
        return errorResponse(res, err.statusCode, err);
    }
};

module.exports = {
    signupHandler,
    loginHandler,
    getMyProfileHandler,
};
