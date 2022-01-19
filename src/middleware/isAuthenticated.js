const hasToken = require("../helpers/jwt").hasToken;
const constants = require("../constants");
const userDao = require("../../db/dao/user");

module.exports = async (req, _, next) => {
    try {
        const payload = await hasToken(req);
        if (!payload)
            throw {
                statusCode: constants.StatusCode.Unauthorized,
                message: "Token is missing",
            };
        if (payload.exp < new Date().getTime())
            throw {
                statusCode: constants.StatusCode.Unauthorized,
                message: "Token has expired",
            };

        const userData = await userDao.findOne({ _id: payload.id });
        if (!userData)
            throw {
                statusCode: constants.StatusCode.Unauthorized,
                message: "Token is invalid",
            };
        req.userId = userData._id;
        next();
    } catch (err) {
        return next(err);
    }
};
