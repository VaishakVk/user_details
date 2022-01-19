const jwt = require("jsonwebtoken");
const { StatusCode } = require("../constants");

const sign = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY);
};

const decode = (token) => {
    if (!token) throw { message: "Token is required" };
    return jwt.verify(token, process.env.JWT_KEY);
};

const hasToken = (req) => {
    const token = req.headers.authorization;
    if (!token)
        throw {
            statusCode: StatusCode.Unauthorized,
            message: "Token is missing",
        };
    return decode(token.replace("Bearer", "").trim());
};

module.exports = {
    sign,
    decode,
    hasToken,
};
