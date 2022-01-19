require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const constants = require("./src/constants");
const { errorResponse } = require("./src/formatter");

const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");

const app = express();

app.use(helmet());
app.use(morgan(":method :url :status :date[iso] :response-time ms"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.header("Access-Control-Expose-Headers", "Content-Length");
    res.header(
        "Access-Control-Allow-Headers",
        "Accept, Authorization, Content-Type, X-Requested-With, Range"
    );
    if (req.method === "OPTIONS") {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/status", (_, res) => {
    return res.status(constants.StatusCode.Ok).send({
        status: true,
        message: "Server is up!",
    });
});

app.use((err, _, res, _1) => {
    return errorResponse(
        res,
        err.statusCode || constants.StatusCode.InternalServerError,
        err
    );
});

module.exports = app;
