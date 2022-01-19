const User = require("../models/user");

const create = async ({ email, name, gender, password }) => {
    const user = new User({
        email,
        name,
        gender,
        password,
    });

    return user.save();
};

const findOne = async (query, fields) => {
    return User.findOne(query, fields);
};

const findMany = async (query, fields, skip, limit) => {
    return User.find(query, fields, { skip, limit });
};

const updateOne = async (query, payload) => {
    return User.updateOne(query, payload);
};

module.exports = {
    create,
    findOne,
    updateOne,
    findMany,
};
