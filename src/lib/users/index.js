const { StatusCode } = require("../../constants");
const { errorResponse, successResponse } = require("../../formatter");
const userRepo = require("./repo");

/**
 * @description Handler to get all the users
 * @param req
 * @param res
 * @returns
 */
const getAllUsersHandler = async (req, res) => {
    try {
        const usersData = await userRepo.getAllUsers(req.query);
        return successResponse(res, StatusCode.Ok, usersData);
    } catch (err) {
        return errorResponse(res, err.statusCode, err);
    }
};

module.exports = {
    getAllUsersHandler,
};
