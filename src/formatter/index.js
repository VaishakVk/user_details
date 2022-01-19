const { StatusCode } = require("../../src/constants");

/**
 * @description Handler to format success response
 * @param {Express.Response} res
 * @param {number} statusCode
 * @param {any} data
 */
const successResponse = (res, statusCode, data) => {
    res.status(statusCode).send({
        success: true,
        code: statusCode,
        message: data,
    });
};

/**
 * @description Handler to format error response
 * @param {Express.Response} res
 * @param {number} statusCode
 * @param {any} error
 */
const errorResponse = (res, statusCode, err) => {
    res.status(statusCode || StatusCode.InternalServerError).send({
        success: false,
        message: err.message || err,
    });
};

module.exports = {
    successResponse,
    errorResponse,
};
