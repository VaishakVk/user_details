const { StatusCode, PaginateDefault } = require("../constants");

const getSkipAndLimit = (page, limit) => {
    if (page < 1 || limit < 1)
        throw {
            statusCode: StatusCode.BadRequest,
            message: "Invalid pagination options",
        };
    // Default to 10 when limit is not passed
    if (page && !limit) limit = PaginateDefault;
    else if (!page && !limit) {
        // Default to all results when page and limit is not sent
        page = 1;
        limit = Number.MAX_SAFE_INTEGER;
    } else if (!page) page = 1;

    return { skip: Number((page - 1) * limit), limit: Number(limit) };
};

module.exports = { getSkipAndLimit };
