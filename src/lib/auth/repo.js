const { StatusCode } = require("../../constants");
const userDao = require("../../../db/dao/user");
const bcryptUtils = require("../../helpers/bcrypt");
const jwtUtils = require("../../helpers/jwt");

const getUserByEmail = async (email) => {
    const emailQuery = {
        email: { $regex: email, $options: "i" },
    };

    return userDao.findOne(emailQuery);
};

const getMyProfileData = async (userId) => {
    const query = {
        _id: userId,
    };

    return userDao.findOne(query, { password: 0 });
};

const createUser = async ({ name, email, gender, password }) => {
    const userWithEmail = await getUserByEmail(email);
    if (userWithEmail)
        throw {
            statusCode: StatusCode.BadRequest,
            message: "User already exists with the same email",
        };

    const hashedPassword = await bcryptUtils.hash(password);
    const newUser = await userDao.create({
        email,
        name,
        gender,
        password: hashedPassword,
    });
    return newUser;
};

const login = async (email, password) => {
    const userData = await getUserByEmail(email);
    if (!userData)
        throw {
            statusCode: StatusCode.Unauthorized,
            message: "Email or password is invalid",
        };
    const isPasswordMatch = await bcryptUtils.comparePasword(
        password,
        userData.password
    );
    if (!isPasswordMatch)
        throw {
            statusCode: StatusCode.Unauthorized,
            message: "Email or password is invalid",
        };
    const payload = {
        id: userData._id,
        iat: new Date().getTime(),
        exp: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    };

    const token = await jwtUtils.sign(payload);
    await userDao.updateOne(
        { _id: userData._id },
        { lastLoggedInAt: new Date() }
    );

    return token;
};

module.exports = {
    createUser,
    login,
    getMyProfileData,
};
