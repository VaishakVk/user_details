const mongoose = require("mongoose");
const constants = require("../../src/constants");
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            required: true,
            enum: Object.values(constants.Gender),
        },
        password: {
            type: String,
            required: true,
        },
        lastLoggedInAt: {
            type: Date,
        },
    },
    { timestamps: true }
);
userSchema.method("toJSON", function () {
    const { __v, createdAt, updatedAt, ...object } = this.toObject();
    delete object.password;
    return object;
});
module.exports = mongoose.model("User", userSchema);
