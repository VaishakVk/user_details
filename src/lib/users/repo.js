const userDao = require("../../../db/dao/user");
const paginateHelpers = require("../../helpers/paginate");

const getAllUsers = async ({ page, maximum }) => {
    const { skip, limit } = paginateHelpers.getSkipAndLimit(page, maximum);
    const query = {};
    const fields = { password: 0 };
    return userDao.findMany(query, fields, skip, limit);
};

module.exports = {
    getAllUsers,
};
