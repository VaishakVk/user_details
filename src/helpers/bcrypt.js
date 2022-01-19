const bcrypt = require("bcryptjs");
const constants = require("../constants");

const hash = async (data) => {
    if (!data) throw "Data is required";
    const salt = await bcrypt.genSalt(constants.SaltRounds);
    const hashed = await bcrypt.hash(data, salt);
    return hashed;
};

const comparePasword = async (val, hash) => {
    if (!val || !hash) throw "Hash and value is required";
    const compared = await bcrypt.compare(val, hash);
    return compared;
};

module.exports = {
    comparePasword,
    hash,
};
